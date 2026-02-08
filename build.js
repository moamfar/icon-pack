const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const baseDir = path.join(__dirname, ".");
const rawDir = path.join(baseDir, "src", "raw");
const outputDir = path.join(__dirname, "dist");

// --- UTILITIES ---

// Convert to PascalCase for component names
const toPascalCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

// Convert to camelCase for weight keys
const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(\w)/g, (_, char) => char.toUpperCase())
    .replace(/^\w/, (char) => char.toLowerCase());
};

// Parse SVG with proper duotone handling
function parseSvg(svgString, weightName = "") {
  const isDuotone = weightName.toLowerCase().includes("duotone");
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 256 256";

  let content = svgString.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");

  if (isDuotone) {
    // For duotone icons: Find all unique fill colors
    const fillMatches = [...content.matchAll(/fill="([^"]*)"/g)];
    const uniqueFills = new Set();

    fillMatches.forEach((match) => {
      if (match[1] !== "none" && match[1] !== "currentColor") {
        uniqueFills.add(match[1]);
      }
    });

    const fillsArray = Array.from(uniqueFills);

    if (fillsArray.length >= 2) {
      // Multiple colors detected - determine primary and secondary
      // Usually the first color is primary, second is secondary
      let primaryReplaced = false;

      content = content.replace(/fill="([^"]*)"/g, (match, fillValue) => {
        if (fillValue === "none") return 'fill="none"';
        if (fillValue === "currentColor") return match;

        if (fillValue === fillsArray[0] && !primaryReplaced) {
          // Primary color → currentColor (full opacity)
          primaryReplaced = true;
          return 'fill="currentColor"';
        } else {
          // Secondary color → currentColor with reduced opacity
          return 'fill="currentColor" opacity="0.4"';
        }
      });
    } else {
      // Single color or couldn't detect - use simple approach
      let firstFill = true;

      content = content.replace(/fill="([^"]*)"/g, (match, fillValue) => {
        if (fillValue === "none") return 'fill="none"';
        if (fillValue === "currentColor") return match;

        if (firstFill) {
          firstFill = false;
          return 'fill="currentColor"';
        } else {
          return 'fill="currentColor" opacity="0.4"';
        }
      });
    }

    // Handle strokes in duotone
    content = content.replace(/stroke="([^"]*)"/g, (match, strokeValue) => {
      if (strokeValue === "none") return 'stroke="none"';
      return 'stroke="currentColor"';
    });
  } else {
    // For non-duotone icons: replace all with currentColor
    content = content.replace(/fill="([^"]*)"/g, (match, fillValue) => {
      if (fillValue === "none") return 'fill="none"';
      return 'fill="currentColor"';
    });

    content = content.replace(/stroke="([^"]*)"/g, (match, strokeValue) => {
      if (strokeValue === "none") return 'stroke="none"';
      return 'stroke="currentColor"';
    });
  }

  return { viewBox, content };
}

// --- MAIN BUILD ---
console.log("🚀 Building icon package...");

if (!fs.existsSync(rawDir)) {
  console.error(`❌ Error: Directory not found: ${rawDir}`);
  process.exit(1);
}

// Discover weights
const weightFolders = fs.readdirSync(rawDir).filter((file) => {
  return fs.statSync(path.join(rawDir, file)).isDirectory();
});

const weightMap = new Map();
weightFolders.forEach((folderName) => {
  weightMap.set(folderName, toCamelCase(folderName));
});

console.log(`📦 Found weights: ${Array.from(weightMap.values()).join(", ")}`);

// Discover icons from first weight folder
const firstWeight = weightFolders[0];
const referencePath = path.join(rawDir, firstWeight);
const categories = fs.readdirSync(referencePath).filter((file) => {
  return fs.statSync(path.join(referencePath, file)).isDirectory();
});

const iconRegistry = new Map();
categories.forEach((category) => {
  const categoryPath = path.join(referencePath, category);
  const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith(".svg"));

  files.forEach((filename) => {
    const rawName = filename.replace(".svg", "");
    const componentName = toPascalCase(rawName);

    if (!iconRegistry.has(componentName)) {
      iconRegistry.set(componentName, {
        category,
        originalFilename: filename,
      });
    }
  });
});

console.log(`🎨 Discovered ${iconRegistry.size} unique icons`);

// Create dist directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate each icon component
const exportStatements = [];
const componentNames = Array.from(iconRegistry.keys());

componentNames.forEach((componentName) => {
  const meta = iconRegistry.get(componentName);
  const weightContents = {};
  let sharedViewBox = null;
  let hasAtLeastOneWeight = false;

  // Collect SVG content for each weight
  weightFolders.forEach((folderWeight) => {
    const codeWeight = weightMap.get(folderWeight);
    const filePath = path.join(rawDir, folderWeight, meta.category, meta.originalFilename);

    if (fs.existsSync(filePath)) {
      const svgContent = fs.readFileSync(filePath, "utf-8");
      const parsed = parseSvg(svgContent, folderWeight);

      weightContents[codeWeight] = parsed.content;
      if (!sharedViewBox) sharedViewBox = parsed.viewBox;
      hasAtLeastOneWeight = true;
    }
  });

  if (!hasAtLeastOneWeight) {
    console.warn(`⚠️ Skipping ${componentName}: No SVG files found`);
    return;
  }

  // Create weight mapping string
  const weightMapString = Object.keys(weightContents)
    .map((weight) => `  "${weight}": \`${(weightContents[weight] || "").replace(/`/g, "\\`")}\`,`)
    .join("\n");

  // Generate JS file
  const jsContent = `"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.${componentName} = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
${weightMapString}
};

const ${componentName} = ({ size = 24, color = "currentColor", weight = "outline", className = "", style = {}, ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    
    const svgProps = {
        viewBox: "${sharedViewBox}",
        width: size,
        height: size,
        fill: "currentColor",
        stroke: "currentColor",
        className: className,
        style: { color, ...style },
        ...props
    };
    
    return (react_1.default.createElement("svg", svgProps,
        react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } })));
};

exports.${componentName} = ${componentName};
`;

  // Write JS file
  fs.writeFileSync(path.join(outputDir, `${componentName}.js`), jsContent);
  exportStatements.push(`exports.${componentName} = require('./${componentName}').${componentName};`);

  // Generate TypeScript declaration file
  const dtsContent = `import * as React from "react";
import { IconProps } from "./types";

export declare const ${componentName}: React.FC<IconProps>;
`;
  fs.writeFileSync(path.join(outputDir, `${componentName}.d.ts`), dtsContent);

  console.log(`✅ Generated ${componentName}`);
});

// Create index.js
const indexJs = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
${exportStatements.join("\n")}
`;
fs.writeFileSync(path.join(outputDir, "index.js"), indexJs);

// Create index.d.ts
const indexDtsExports = componentNames.map((name) => `export { ${name} } from "./${name}";`).join("\n");
const indexDts = `export * from "./types";
${indexDtsExports}
`;
fs.writeFileSync(path.join(outputDir, "index.d.ts"), indexDts);

// Copy types.ts
const typesSource = path.join(baseDir, "src", "types.ts");
const typesDest = path.join(outputDir, "types.ts");
if (fs.existsSync(typesSource)) {
  fs.copyFileSync(typesSource, typesDest);
} else {
  // Create basic types if not exists
  const weightValues = Array.from(weightMap.values());
  const basicTypes = `import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  weight?: ${weightValues.map((w) => `"${w}"`).join(" | ")};
}
`;
  fs.writeFileSync(typesDest, basicTypes);
}

// Create index.esm.js for ES modules
const indexEsmExports = componentNames.map((name) => `export { ${name} } from "./${name}.js";`).join("\n");
const indexEsm = `${indexEsmExports}
`;
fs.writeFileSync(path.join(outputDir, "index.esm.js"), indexEsm);

console.log(`\n✅ Build complete! Generated ${componentNames.length} icons in dist/`);
console.log(`📦 CommonJS: dist/index.js`);
console.log(`📦 ES Module: dist/index.esm.js`);
console.log(`📦 TypeScript: dist/index.d.ts`);
