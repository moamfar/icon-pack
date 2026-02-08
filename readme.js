const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "package.json");
const readmeOutputPath = path.join(__dirname, "README.md");
const distDir = path.join(__dirname, "dist");

const GITHUB_USERNAME = "moamfar";
const GITHUB_REPO_NAME = "icon-pack";

// Get exported components from dist/index.js
function getExportedComponents() {
  const indexPath = path.join(distDir, "index.js");
  if (!fs.existsSync(indexPath)) return [];

  const content = fs.readFileSync(indexPath, "utf-8");
  const regex = /exports\.(\w+)\s*=/g;
  const components = [];
  let match;

  while ((match = regex.exec(content))) {
    components.push(match[1]);
  }

  return components.sort();
}

// Generate icon table (showing first 20 icons)
function generateIconTable(components) {
  if (components.length === 0) return "No icons found.";

  const first20 = components.slice(0, 20);

  let table = "| Icon | Name | Icon | Name |\n|------|------|------|------|\n";

  for (let i = 0; i < first20.length; i += 2) {
    const icon1 = first20[i];
    const icon2 = first20[i + 1];

    table += `| \`${icon1}\` | ${icon1} | ${icon2 ? `\`${icon2}\`` : ""} | ${icon2 || ""} |\n`;
  }

  if (components.length > 20) {
    table += `\n**... and ${components.length - 20} more icons**\n`;
  }

  return table;
}

// Main README generation
try {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const components = getExportedComponents();

  const readmeContent = `# ${pkg.name}

${pkg.description}

![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
![license](https://img.shields.io/npm/l/${pkg.name}.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-%E2%9C%94-blue)

## Features

- **🎨 6 Different Weights:** Bold, Bold Duotone, Broken, Line Duotone, Linear, and Outline
- **🌳 Tree-shakable:** Import only what you use
- **✨ TypeScript Ready:** Full type definitions included
- **⚡ Zero Dependencies:** Lightweight and fast
- **🎯 React 16.8+ Compatible:** Works with all modern React versions

## Installation

\`\`\`bash
npm install ${pkg.name}
\`\`\`

or

\`\`\`bash
yarn add ${pkg.name}
\`\`\`

## Quick Start

\`\`\`tsx
import { Heart, Star, User } from "${pkg.name}";

function App() {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Heart size={32} color="red" weight="bold" />
      <Star size={24} color="gold" />
      <User size={48} color="#4f46e5" weight="linear" />
    </div>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number\` | \`24\` | Icon width and height |
| \`color\` | \`string\` | \`"currentColor"\` | Fill color |
| \`weight\` | \`string\` | \`"outline"\` | Style variant (bold, linear, outline, etc.) |
| \`...props\` | \`SVGProps\` | - | Standard SVG attributes |

## Available Icons

There are **${components.length}** icons available:

${generateIconTable(components)}

[View all ${components.length} icons →](https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME})

## Weight Variants

Each icon comes in multiple styles:

- **Outline** - Thin line icons
- **Bold** - Thick filled icons  
- **Linear** - Single weight line icons
- **Broken** - Dashed/stroke icons
- **Bold Duotone** - Two-tone filled icons
- **Line Duotone** - Two-tone line icons

## License

MIT © ${new Date().getFullYear()} ${GITHUB_USERNAME}

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/${GITHUB_USERNAME}">${GITHUB_USERNAME}</a>
</div>
`;

  fs.writeFileSync(readmeOutputPath, readmeContent);
  console.log(`✅ README.md generated with ${components.length} icons`);
} catch (error) {
  console.error("❌ Error generating README:", error);
  process.exit(1);
}
