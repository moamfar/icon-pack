const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const baseDir = path.join(__dirname, ".");
const rawDir = path.join(baseDir, "src", "raw");
const outputDir = path.join(__dirname, "dist");

// --- UTILITIES ---
const toPascalCase = (str) =>
  str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");

const toCamelCase = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(\w)/g, (_, char) => char.toUpperCase())
    .replace(/^\w/, (c) => c.toLowerCase());

// Parse SVG with duotone support
function parseSvg(svgString, weightName = "") {
  const isDuotone = weightName.toLowerCase().includes("duotone");
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 256 256";

  let content = svgString.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");

  if (isDuotone) {
    const fillMatches = [...content.matchAll(/fill="([^"]*)"/g)];
    const uniqueFills = Array.from(
      new Set(fillMatches.map((m) => m[1]).filter((v) => v !== "none" && v !== "currentColor")),
    );

    let primaryUsed = false;
    content = content.replace(/fill="([^"]*)"/g, (match, fill) => {
      if (fill === "none") return 'fill="none"';
      if (fill === "currentColor") return match;
      if (!primaryUsed) {
        primaryUsed = true;
        return 'fill="currentColor"';
      } else {
        return 'fill="currentColor" opacity="0.4"';
      }
    });

    content = content.replace(/stroke="([^"]*)"/g, (match, stroke) => {
      if (stroke === "none") return 'stroke="none"';
      return 'stroke="currentColor"';
    });
  } else {
    content = content.replace(/fill="([^"]*)"/g, (match, fill) =>
      fill === "none" ? 'fill="none"' : 'fill="currentColor"',
    );
    content = content.replace(/stroke="([^"]*)"/g, (match, stroke) =>
      stroke === "none" ? 'stroke="none"' : 'stroke="currentColor"',
    );
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
const weightFolders = fs.readdirSync(rawDir).filter((file) => fs.statSync(path.join(rawDir, file)).isDirectory());
const weightMap = new Map(weightFolders.map((w) => [w, toCamelCase(w)]));
console.log(`📦 Found weights: ${Array.from(weightMap.values()).join(", ")}`);

// Discover icons (nested categories)
function getAllSvgFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(getAllSvgFiles(fullPath));
    else if (file.endsWith(".svg")) results.push(fullPath);
  });
  return results;
}

const iconRegistry = new Map();
weightFolders.forEach((weightFolder) => {
  const weightPath = path.join(rawDir, weightFolder);
  const files = getAllSvgFiles(weightPath);

  files.forEach((fullPath) => {
    const relativePath = path.relative(weightPath, fullPath);
    const parts = relativePath.split(path.sep);
    const filename = parts.pop();
    const rawName = filename.replace(".svg", "");
    const componentName = toPascalCase(rawName);

    if (!iconRegistry.has(componentName)) {
      iconRegistry.set(componentName, { files: new Map() });
    }
    iconRegistry.get(componentName).files.set(weightFolder, fullPath);
  });
});

console.log(`🎨 Discovered ${iconRegistry.size} unique icons`);

// Ensure dist exists
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Generate components
const exportStatements = [];
const componentNames = Array.from(iconRegistry.keys());

componentNames.forEach((componentName) => {
  const meta = iconRegistry.get(componentName);
  const weightContents = {};
  let sharedViewBox = null;

  for (const [weightFolder, filePath] of meta.files.entries()) {
    if (!fs.existsSync(filePath)) continue;
    const parsed = parseSvg(fs.readFileSync(filePath, "utf-8"), weightFolder);
    weightContents[toCamelCase(weightFolder)] = parsed.content;
    if (!sharedViewBox) sharedViewBox = parsed.viewBox;
  }

  const weightMapString = Object.keys(weightContents)
    .map((w) => `  "${w}": \`${weightContents[w].replace(/`/g, "\\`")}\`,`)
    .join("\n");

  const jsContent = `"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) { return (mod && mod.__esModule) ? mod : { "default": mod }; };
Object.defineProperty(exports, "__esModule", { value: true });
exports.${componentName} = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
${weightMapString}
};
const ${componentName} = ({ size = 24, color = "currentColor", weight = "outline", className = "", style = {}, ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    const svgProps = { viewBox: "${sharedViewBox}", width: size, height: size, fill: "currentColor", stroke: "currentColor", className, style: { color, ...style }, ...props };
    return react_1.default.createElement("svg", svgProps, react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } }));
};
exports.${componentName} = ${componentName};
`;
  fs.writeFileSync(path.join(outputDir, `${componentName}.js`), jsContent);
  exportStatements.push(`exports.${componentName} = require('./${componentName}').${componentName};`);

  const dtsContent = `import * as React from "react";
import { IconProps } from "./types";
export declare const ${componentName}: React.FC<IconProps>;
`;
  fs.writeFileSync(path.join(outputDir, `${componentName}.d.ts`), dtsContent);
});

// Generate index.js, index.esm.js, index.d.ts
fs.writeFileSync(
  path.join(outputDir, "index.js"),
  `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n${exportStatements.join("\n")}\n`,
);
fs.writeFileSync(
  path.join(outputDir, "index.esm.js"),
  componentNames.map((n) => `export { ${n} } from "./${n}.js";`).join("\n"),
);
fs.writeFileSync(
  path.join(outputDir, "index.d.ts"),
  `export * from "./types";\n${componentNames.map((n) => `export { ${n} } from "./${n}";`).join("\n")}`,
);

// Copy or create types.ts
const typesSource = path.join(baseDir, "src", "types.ts");
const typesDest = path.join(outputDir, "types.ts");
if (fs.existsSync(typesSource)) fs.copyFileSync(typesSource, typesDest);
else {
  const basicTypes = `import { SVGProps } from "react";
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  weight?: ${Array.from(weightMap.values())
    .map((w) => `"${w}"`)
    .join(" | ")};
}
`;
  fs.writeFileSync(typesDest, basicTypes);
}

console.log(`\n✅ Build complete! Generated ${componentNames.length} icons in dist/`);
console.log(`📦 CommonJS: dist/index.js`);
console.log(`📦 ES Module: dist/index.esm.js`);
console.log(`📦 TypeScript: dist/index.d.ts`);
