const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const packageJsonPath = path.join(__dirname, "package.json");
const generatedIndexPath = path.join(__dirname, "src", "generated", "index.ts");
const readmeOutputPath = path.join(__dirname, "README.md");
const rawIconsDir = path.join(__dirname, "src", "raw", "outline");

// --- UTILITIES ---

// 1. Parse index.ts to get component names
function getExportedComponents(indexPath) {
  if (!fs.existsSync(indexPath)) {
    console.warn("⚠️ Generated index.ts not found. Run your build script first.");
    return [];
  }
  const content = fs.readFileSync(indexPath, "utf-8");
  const regex = /export\s+{\s*(\w+)\s*}\s+from\s+["'].+["'];/g;
  const components = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    components.push(match[1]);
  }
  return components.sort();
}

// 2. Convert SVG file to a Base64 Data URI string
function getBase64Icon(componentName) {
  const candidates = [`${componentName}.svg`, `${componentName.toLowerCase()}.svg`];

  for (const filename of candidates) {
    const fullPath = path.join(rawIconsDir, filename);
    if (fs.existsSync(fullPath)) {
      const svgContent = fs.readFileSync(fullPath, "utf-8");
      const base64 = Buffer.from(svgContent).toString("base64");
      return `<img src="data:image/svg+xml;base64,${base64}" width="24" height="24" style="vertical-align: middle;" alt="${componentName}" />`;
    }
  }
  return `<code>${componentName}</code>`;
}

// 3. Generate HTML Table for Icons
function generateIconList(components) {
  if (components.length === 0) return "No icons found.";

  let tableHTML = `<table style="border-collapse: collapse; width: 100%; min-width: 500px;">\n  <thead>\n    <tr style="border-bottom: 1px solid #ddd;">\n      <th style="text-align: center; padding: 12px; width: 50px;">Preview</th>\n      <th style="text-align: left; padding: 12px;">Name</th>\n      <th style="text-align: center; padding: 12px; width: 50px;">Preview</th>\n      <th style="text-align: left; padding: 12px;">Name</th>\n    </tr>\n  </thead>\n  <tbody>\n`;

  for (let i = 0; i < components.length; i += 2) {
    const name1 = components[i];
    const img1 = getBase64Icon(name1);

    const name2 = components[i + 1];
    const img2 = name2 ? getBase64Icon(name2) : "";

    tableHTML += `    <tr style="border-bottom: 1px solid #eee;">\n`;
    tableHTML += `      <td style="text-align: center; padding: 10px;">${img1}</td>\n`;
    tableHTML += `      <td style="text-align: left; padding: 10px;"><code>${name1}</code></td>\n`;

    if (name2) {
      tableHTML += `      <td style="text-align: center; padding: 10px;">${img2}</td>\n`;
      tableHTML += `      <td style="text-align: left; padding: 10px;"><code>${name2}</code></td>\n`;
    } else {
      tableHTML += `      <td></td>\n      <td></td>\n`;
    }

    tableHTML += `    </tr>\n`;
  }

  tableHTML += `  </tbody>\n</table>`;
  return tableHTML;
}

// 4. Generate Props Table
function generatePropsTable() {
  return `
<h3>Component Props</h3>

<table style="border-collapse: collapse; width: 100%; min-width: 500px;">
  <thead>
    <tr style="border-bottom: 2px solid #ddd;">
      <th style="text-align: left; padding: 8px;">Prop</th>
      <th style="text-align: left; padding: 8px;">Type</th>
      <th style="text-align: left; padding: 8px;">Default</th>
      <th style="text-align: left; padding: 8px;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 8px;"><code>size</code></td>
      <td style="padding: 8px;"><code>number</code></td>
      <td style="padding: 8px;"><code>24</code></td>
      <td style="padding: 8px;">Sets the width and height of the icon.</td>
    </tr>
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 8px;"><code>color</code></td>
      <td style="padding: 8px;"><code>string</code></td>
      <td style="padding: 8px;"><code>"currentColor"</code></td>
      <td style="padding: 8px;">Sets the fill color.</td>
    </tr>
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 8px;"><code>weight</code></td>
      <td style="padding: 8px;"><code>"outline" | "bold"</code></td>
      <td style="padding: 8px;"><code>"outline"</code></td>
      <td style="padding: 8px;">Switches between the icon styles.</td>
    </tr>
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 8px;"><code>...props</code></td>
      <td style="padding: 8px;"><code>SVGAttributes</code></td>
      <td style="padding: 8px;"><code>-</code></td>
      <td style="padding: 8px;">Allows standard SVG props like <code>className</code>, <code>id</code>, etc.</td>
    </tr>
  </tbody>
</table>
`;
}

// --- MAIN LOGIC ---

try {
  // 1. Load Package Metadata
  let pkgName = "my-icon-pack";
  let pkgDesc = "A collection of beautiful SVG icons.";

  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    pkgName = pkg.name || pkgName;
    pkgDesc = pkg.description || pkgDesc;
  }

  // 2. Get Component List
  const components = getExportedComponents(generatedIndexPath);
  const iconListHTML = generateIconList(components);
  const propsTableHTML = generatePropsTable();

  // 3. Construct README Content
  const readmeContent = `# ${pkgName}

![npm version](https://badge.fury.io/js/${pkgName}.svg)
![npm downloads](https://img.shields.io/npm/dm/${pkgName}.svg)
![License](https://img.shields.io/npm/l/${pkgName}.svg)
![Typescript](https://img.shields.io/badge/TypeScript-5.0-blue)

 ${pkgDesc}

## Features

*   **🌳 Tree-shakable:** Only import the icons you use.
*   **🎨 Customizable:** Control size, color, and weight (Outline/Bold) easily.
*   **✨ TypeScript:** Built with full type safety support.
*   **🛠 Framework Agnostic:** Works with React, Next.js, Vite, and CRA.
*   **⚡ Zero Dependencies:** Lightweight footprint.

## Installation

\`\`\`bash
npm install ${pkgName}
\`\`\`

or

\`\`\`bash
yarn add ${pkgName}
\`\`\`

## Usage

\`\`\`tsx
import { ${components.slice(0, 3).join(", ")} } from "${pkgName}";

const App = () => {
  return (
    <div>
      <${components[0]} size={32} color="black" />
      <${components[1]} size={32} color="blue" weight="bold" />
      <${components[2]} size={48} className="text-red-500" />
    </div>
  );
};
\`\`\`

 ${propsTableHTML}

## Available Icons

There are currently **${components.length}** icons.

<!-- Icons Grid Start -->
 ${iconListHTML}
<!-- Icons Grid End -->

## Keywords

 ${pkgDesc}

react, icons, svg, components, ui, outline, bold, weight, typescript, tailwind, icon-library, design-system, free-icons

## License

MIT
`;

  // 4. Write to file
  fs.writeFileSync(readmeOutputPath, readmeContent);
  console.log(`✅ README.md generated successfully with SEO tags!`);
} catch (error) {
  console.error("❌ Error generating README:", error);
  process.exit(1);
}
