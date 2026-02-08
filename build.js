const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const baseDir = path.join(__dirname, ".");
const rawDir = path.join(baseDir, "src", "raw");
const outputDir = path.join(baseDir, "src", "generated");

// --- UTILITIES ---

// 1. Convert strings to PascalCase (for Components)
const toPascalCase = (str) => {
  // Remove spaces, underscores, hyphens
  const cleaned = str.replace(/\s+/g, "").trim();
  return cleaned;
};

// 2. Convert strings to camelCase (for Weights)
// e.g., "Bold Duotone" -> "boldDuotone"
const toCamelCase = (str) => {
  const cleaned = str.replace(/\s+/g, "").trim();
  return cleaned
    .replace(/\w\S*/g, (txt, index) => {
      if (index === 0) {
        return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .replace(/\s+/g, "");
};

// Helper to extract viewBox and inner HTML from an SVG string
function parseSvg(svgString) {
  // 1. Extract ViewBox
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 256 256";

  // 2. Extract Inner Content
  let content = svgString.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");

  // 3. Normalize Attributes
  // A. HANDLE FILL: Remove hardcoded fills (except none)
  content = content.replace(/\sfill="[^"]*"/g, (match) => {
    if (match.includes("none")) return match;
    return "";
  });

  // B. HANDLE STROKE: Remove hardcoded strokes (except none)
  content = content.replace(/\sstroke="[^"]*"/g, (match) => {
    if (match.includes("none")) return match;
    return "";
  });

  return { viewBox, content };
}

// --- DYNAMIC DISCOVERY ---

if (!fs.existsSync(rawDir)) {
  console.error(`❌ Error: Directory not found: ${rawDir}`);
  process.exit(1);
}

// 1. Discover Weights (Top-level folders in src/raw)
// Map: "Bold Duotone" (folder) -> "boldDuotone" (code)
const weightMap = new Map();

const rawFolders = fs.readdirSync(rawDir).filter((file) => {
  const filePath = path.join(rawDir, file);
  return fs.statSync(filePath).isDirectory();
});

rawFolders.forEach((folderName) => {
  weightMap.set(folderName, toCamelCase(folderName));
});

const weights = Array.from(weightMap.keys()); // e.g. ["Bold Duotone", "Linear"]
const weightsCode = Array.from(weightMap.values()); // e.g. ["boldDuotone", "linear"]

console.log(`🔍 Found weights: ${weightsCode.join(", ")}`);

// 2. Discover Icons
const iconRegistry = new Map();

const referenceWeight = weights[0]; // e.g. "Bold Duotone"
if (!referenceWeight) {
  console.error("❌ Error: No weights found in src/raw");
  process.exit(1);
}

const referencePath = path.join(rawDir, referenceWeight);
const categories = fs.readdirSync(referencePath).filter((file) => {
  return fs.statSync(path.join(referencePath, file)).isDirectory();
});

categories.forEach((category) => {
  const categoryPath = path.join(referencePath, category);
  const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith(".svg"));

  files.forEach((filename) => {
    const ext = path.extname(filename);
    const rawName = filename.replace(ext, ""); // e.g. "My Icon"
    const componentName = toPascalCase(rawName); // e.g. "MyIcon"

    if (!iconRegistry.has(componentName)) {
      iconRegistry.set(componentName, {
        category,
        originalFilename: filename,
      });
    }
  });
});

console.log(`🔍 Discovered ${iconRegistry.size} unique icons across categories.`);

// --- BUILD LOGIC ---

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let exportStatements = [];

iconRegistry.forEach((meta, componentName) => {
  const weightContents = {};
  let sharedViewBox = null;
  let hasAtLeastOneWeight = false;

  // Check every weight folder for this specific icon
  weights.forEach((folderWeight) => {
    const codeWeight = weightMap.get(folderWeight);

    const filePath = path.join(rawDir, folderWeight, meta.category, meta.originalFilename);

    if (fs.existsSync(filePath)) {
      const svgContent = fs.readFileSync(filePath, "utf-8");
      const parsed = parseSvg(svgContent);

      // Store using the CAMEL CASE key (e.g., "boldDuotone")
      weightContents[codeWeight] = parsed.content;

      if (!sharedViewBox) sharedViewBox = parsed.viewBox;
      hasAtLeastOneWeight = true;
    }
  });

  if (!hasAtLeastOneWeight) {
    console.warn(`⚠️  Skipping ${componentName}: No SVG files found in any weight folder.`);
    return;
  }

  const availableWeightsString = JSON.stringify(Object.keys(weightContents));

  // Generate the object string for the template
  const weightMapString = Object.keys(weightContents)
    .map((w) => {
      return `    "${w}": \`${(weightContents[w] || "").replace(/`/g, "\\`")}\`,`;
    })
    .join("\n");

  const componentTemplate = `import * as React from "react";
import { IconProps } from "./types";

// Weights available: ${Object.keys(weightContents).join(", ")}
const svgs = {
 ${weightMapString}
};

export const ${componentName}: React.FC<IconProps> = ({ size = 24, color = "currentColor", weight, ...props }) => {
  // If weight is passed and exists, use it. Otherwise default to the first available weight.
  const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];

  return (
    <svg
      viewBox="${sharedViewBox}"
      width={size}
      height={size}
      fill={color}
      {...props}
    >
      <g dangerouslySetInnerHTML={{ __html: svgs[activeWeight] }} />
    </svg>
  );
};
`;

  const outputPath = path.join(outputDir, `${componentName}.tsx`);
  fs.writeFileSync(outputPath, componentTemplate);

  exportStatements.push(`export { ${componentName} } from "./${componentName}";`);
});

// --- COPY TYPES FILE ---
const typesSource = path.join(baseDir, "src", "types.ts");
const typesDest = path.join(outputDir, "types.ts");

if (fs.existsSync(typesSource)) {
  fs.copyFileSync(typesSource, typesDest);
  console.log(`📄 Copied types.ts to generated folder.`);
} else {
  console.warn("⚠️  src/types.ts not found! Please create it in your src folder.");
  process.exit(1);
}

// --- GENERATE INDEX ---
const indexTemplate = `// Auto-generated by build.js
import { IconProps } from "./types";

 ${exportStatements.join("\n")}
`;

fs.writeFileSync(path.join(outputDir, "index.ts"), indexTemplate);
console.log(`✅ Build Complete! Generated ${iconRegistry.size} unified components in src/generated/`);
