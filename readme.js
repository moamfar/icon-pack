const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const packageJsonPath = path.join(__dirname, "package.json");
const generatedIndexPath = path.join(__dirname, "src", "generated", "index.ts");
const readmeOutputPath = path.join(__dirname, "README.md");

// Define all weight directories
const WEIGHTS = ["bold", "boldduotone", "broken", "lineduotone", "linear", "outline"];
const weightConfigs = {
  bold: { dir: "bold", label: "Bold" },
  boldduotone: { dir: "boldduotone", label: "Bold Duotone" },
  broken: { dir: "broken", label: "Broken" },
  lineduotone: { dir: "lineduotone", label: "Line Duotone" },
  linear: { dir: "linear", label: "Linear" },
  outline: { dir: "outline", label: "Outline" },
};

// UPDATE THESE VALUES FOR YOUR REPOSITORY
const GITHUB_USERNAME = "moamfar"; // Replace with your GitHub username
const GITHUB_REPO_NAME = "icon-pack"; // Replace with your repository name
const GITHUB_BRANCH = "main"; // Or "master" depending on your default branch

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

// 2. Get base component name (without weight suffix)
function getBaseComponentName(componentName) {
  // Remove weight suffixes if they exist
  for (const weight of WEIGHTS) {
    const suffix = weight.charAt(0).toUpperCase() + weight.slice(1);
    if (componentName.endsWith(suffix)) {
      return componentName.slice(0, -suffix.length);
    }
  }
  return componentName;
}

// 3. Find SVG file for a component and weight
function findSvgFile(baseName, weight) {
  const weightDir = path.join(__dirname, "src", "raw", weightConfigs[weight].dir);

  if (!fs.existsSync(weightDir)) {
    return null;
  }

  // Common naming patterns
  const candidates = [
    `${baseName}.svg`,
    `${baseName.toLowerCase()}.svg`,
    `${baseName.charAt(0).toLowerCase() + baseName.slice(1)}.svg`,
    `${baseName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}.svg`,
  ];

  for (const filename of candidates) {
    const fullPath = path.join(weightDir, filename);
    if (fs.existsSync(fullPath)) {
      return { weight, filename, path: fullPath };
    }
  }

  return null;
}

// 4. Get GitHub URL for an SVG
function getSvgGitHubUrl(baseName, weight) {
  const svgFile = findSvgFile(baseName, weight);
  if (!svgFile) {
    return null;
  }

  return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/${GITHUB_BRANCH}/src/raw/${weightConfigs[weight].dir}/${svgFile.filename}`;
}

// 5. Generate icon preview with all weights
function generateIconPreview(baseName) {
  let previewHTML = `<div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">`;

  WEIGHTS.forEach((weight) => {
    const svgUrl = getSvgGitHubUrl(baseName, weight);
    if (svgUrl) {
      previewHTML += `
        <div style="text-align: center; min-width: 40px;">
          <img src="${svgUrl}" width="24" height="24" alt="${baseName} ${weight}" />
          <div style="font-size: 10px; margin-top: 4px; color: #666;">${weightConfigs[weight].label}</div>
        </div>`;
    }
  });

  previewHTML += `</div>`;
  return previewHTML;
}

// 6. Group components by base name
function groupComponentsByBaseName(components) {
  const grouped = {};

  components.forEach((componentName) => {
    const baseName = getBaseComponentName(componentName);
    if (!grouped[baseName]) {
      grouped[baseName] = [];
    }
    grouped[baseName].push(componentName);
  });

  // Convert to array and sort
  return Object.keys(grouped)
    .sort()
    .map((baseName) => ({
      baseName,
      components: grouped[baseName].sort(),
    }));
}

// 7. Generate Markdown Table with all weights
function generateIconList(components) {
  if (components.length === 0) return "**No icons found.**";

  const groupedIcons = groupComponentsByBaseName(components);

  let markdown = "| Preview (All Weights) | Icon Name | Component Names |\n";
  markdown += "|:---:|:---|:---|\n";

  groupedIcons.forEach(({ baseName, components: iconComponents }) => {
    const preview = generateIconPreview(baseName);
    const weightBadges = WEIGHTS.map((weight) => {
      const weightName = weight.charAt(0).toUpperCase() + weight.slice(1);
      const hasWeight = iconComponents.some((comp) => comp.endsWith(weightName));
      return hasWeight
        ? `<span style="background: #e9ecef; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin: 2px; display: inline-block;">${weightConfigs[weight].label}</span>`
        : `<span style="background: #f8f9fa; color: #adb5bd; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin: 2px; display: inline-block;">${weightConfigs[weight].label}</span>`;
    }).join(" ");

    markdown += `| ${preview} | \`${baseName}\` | <div style="max-width: 200px;">${weightBadges}</div> |\n`;
  });

  return markdown;
}

// Alternative: Grid layout with 2 icons per row
function generateIconListGrid(components) {
  if (components.length === 0) return "**No icons found.**";

  const groupedIcons = groupComponentsByBaseName(components);

  let markdown = "| Preview | Icon Name & Weights | Preview | Icon Name & Weights |\n";
  markdown += "|:---:|:---|:---:|:---|\n";

  for (let i = 0; i < groupedIcons.length; i += 2) {
    const icon1 = groupedIcons[i];
    const icon2 = groupedIcons[i + 1];

    const preview1 = generateIconPreview(icon1.baseName);
    const preview2 = icon2 ? generateIconPreview(icon2.baseName) : "";

    const weightsList1 = WEIGHTS.map((weight) => {
      const weightName = weight.charAt(0).toUpperCase() + weight.slice(1);
      const hasWeight = icon1.components.some((comp) => comp.endsWith(weightName));
      return hasWeight
        ? `<span style="background: #4f46e5; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin: 1px; display: inline-block;">${weight.charAt(0).toUpperCase()}</span>`
        : `<span style="background: #f1f5f9; color: #64748b; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin: 1px; display: inline-block;">${weight.charAt(0).toUpperCase()}</span>`;
    }).join("");

    const name1 = `<div><strong>${icon1.baseName}</strong><br/><div style="margin-top: 4px;">${weightsList1}</div></div>`;

    let name2 = "";
    if (icon2) {
      const weightsList2 = WEIGHTS.map((weight) => {
        const weightName = weight.charAt(0).toUpperCase() + weight.slice(1);
        const hasWeight = icon2.components.some((comp) => comp.endsWith(weightName));
        return hasWeight
          ? `<span style="background: #4f46e5; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin: 1px; display: inline-block;">${weight.charAt(0).toUpperCase()}</span>`
          : `<span style="background: #f1f5f9; color: #64748b; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin: 1px; display: inline-block;">${weight.charAt(0).toUpperCase()}</span>`;
      }).join("");

      name2 = `<div><strong>${icon2.baseName}</strong><br/><div style="margin-top: 4px;">${weightsList2}</div></div>`;
    }

    markdown += `| ${preview1} | ${name1} | ${preview2} | ${name2} |\n`;
  }

  return markdown;
}

// 8. Generate Weight Legend
function generateWeightLegend() {
  let legend = "\n### Weight Legend\n\n";
  legend += "| Symbol | Weight | Description |\n";
  legend += "|:---:|:---|:---|\n";

  WEIGHTS.forEach((weight) => {
    const config = weightConfigs[weight];
    legend += `| <span style="background: #4f46e5; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">${weight.charAt(0).toUpperCase()}</span> | **${config.label}** | ${weight} style icons |\n`;
  });

  return legend;
}

// 9. Generate Props Table (updated for weights)
function generatePropsTable() {
  return `
## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number\` | \`24\` | Sets the width and height of the icon |
| \`color\` | \`string\` | \`"currentColor"\` | Sets the fill color |
| \`weight\` | \`"bold" \| "boldduotone" \| "broken" \| "lineduotone" \| "linear" \| "outline"\` | \`"outline"\` | Choose between different icon styles |
| \`...props\` | \`SVGAttributes\` | \`-\` | Standard SVG props like \`className\`, \`id\`, etc. |
`;
}

// 10. Generate Installation Section
function generateInstallationSection(pkgName) {
  return `
## Installation

\`\`\`bash
npm install ${pkgName}
\`\`\`

or

\`\`\`bash
yarn add ${pkgName}
\`\`\`

or

\`\`\`bash
pnpm add ${pkgName}
\`\`\`
`;
}

// 11. Generate Usage Examples with different weights
function generateUsageExamples(pkgName, components) {
  const groupedIcons = groupComponentsByBaseName(components);

  if (groupedIcons.length === 0) {
    return `
## Usage

Import the icons you need and use them as React components:

\`\`\`tsx
import { IconName } from "${pkgName}";

function App() {
  return (
    <div>
      <IconName size={32} color="#333" weight="outline" />
    </div>
  );
}
\`\`\`
`;
  }

  const exampleIcon = groupedIcons[0];
  const exampleName = exampleIcon.baseName;

  // Find available weights for this icon
  const availableWeights = WEIGHTS.filter((weight) => {
    const weightName = weight.charAt(0).toUpperCase() + weight.slice(1);
    return exampleIcon.components.some((comp) => comp.endsWith(weightName));
  });

  return `
## Usage

Import icons by name and specify the weight:

\`\`\`tsx
import { ${exampleName} } from "${pkgName}";

function App() {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      ${availableWeights
        .map((weight) => `<${exampleName} size={32} color="#4f46e5" weight="${weight}" />`)
        .join("\n      ")}
    </div>
  );
}
\`\`\`

### Importing specific weights:

\`\`\`tsx
// You can also import specific weight variants directly
import { ${exampleName}Bold, ${exampleName}Linear, ${exampleName}Outline } from "${pkgName}";

function App() {
  return (
    <div>
      <${exampleName}Bold size={32} color="red" />
      <${exampleName}Linear size={32} color="blue" />
      <${exampleName}Outline size={32} color="green" />
    </div>
  );
}
\`\`\`

For TypeScript users, types are included out of the box.
`;
}

// --- MAIN LOGIC ---

try {
  console.log("📦 Starting README generation...");

  // 1. Load Package Metadata
  let pkgName = "my-icon-pack";
  let pkgDesc = "A collection of beautiful SVG icons in 6 different weights.";
  let pkgVersion = "1.0.0";
  let pkgLicense = "MIT";

  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    pkgName = pkg.name || pkgName;
    pkgDesc = pkg.description || pkgDesc;
    pkgVersion = pkg.version || pkgVersion;
    pkgLicense = pkg.license || pkgLicense;
  } else {
    console.warn("⚠️ package.json not found. Using default values.");
  }

  // 2. Get Component List
  console.log("📋 Getting component list...");
  const components = getExportedComponents(generatedIndexPath);

  if (components.length === 0) {
    console.warn("⚠️ No components found. The index.ts file might be empty or the build hasn't been run.");
  } else {
    console.log(`✅ Found ${components.length} components`);
    const groupedIcons = groupComponentsByBaseName(components);
    console.log(`📊 Grouped into ${groupedIcons.length} unique icons`);

    // Log weight distribution
    const weightCount = {};
    WEIGHTS.forEach((weight) => {
      const weightName = weight.charAt(0).toUpperCase() + weight.slice(1);
      const count = components.filter((comp) => comp.endsWith(weightName)).length;
      weightCount[weight] = count;
    });

    console.log("🎨 Weight distribution:");
    WEIGHTS.forEach((weight) => {
      console.log(`  ${weightConfigs[weight].label}: ${weightCount[weight]}`);
    });
  }

  // 3. Generate Sections
  console.log("🛠️ Generating README sections...");
  const iconListSection = generateIconListGrid(components);
  const weightLegend = generateWeightLegend();
  const propsTableSection = generatePropsTable();
  const installationSection = generateInstallationSection(pkgName);
  const usageSection = generateUsageExamples(pkgName, components);

  // 4. Construct README Content
  console.log("📝 Assembling README...");
  const readmeContent = `# ${pkgName}

![npm downloads](https://img.shields.io/npm/dm/${pkgName}.svg)
![bundle size](https://img.shields.io/bundlephobia/minzip/${pkgName})
![license](https://img.shields.io/npm/l/${pkgName}.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)
![Weights](https://img.shields.io/badge/Weights-6-blueviolet)

${pkgDesc}

## Features

- **🎨 6 Different Weights:** Bold, Bold Duotone, Broken, Line Duotone, Linear, and Outline styles
- **🌳 Tree-shakable:** Only import the icons you use
- **🎨 Customizable:** Control size, color, and weight
- **✨ TypeScript:** Built with full type safety support
- **🛠 Framework Agnostic:** Works with React, Next.js, Vite, and CRA
- **⚡ Zero Dependencies:** Lightweight footprint
- **🎯 Perfect for Design Systems:** Consistent across all weights

${weightLegend}

${installationSection}

${usageSection}

${propsTableSection}

## Available Icons

There are currently **${groupComponentsByBaseName(components).length}** unique icons, each available in up to 6 different weights:

${iconListSection}

## Contributing

We welcome contributions! If you'd like to add new icons or improve existing ones:

1. Fork the repository
2. Create a new branch
3. Add your SVG icons to the appropriate weight directory in \`src/raw/\`
4. Run the build script to generate components
5. Submit a pull request

## Development

To build the project locally:

\`\`\`bash
# Clone the repository
git clone https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}.git

# Install dependencies
npm install

# Build the project
npm run build

# Generate the README (this file)
npm run readme
\`\`\`

## License

${pkgLicense} © ${new Date().getFullYear()} ${GITHUB_USERNAME}. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/${GITHUB_USERNAME}">${GITHUB_USERNAME}</a>
</div>
`;

  // 5. Write to file
  fs.writeFileSync(readmeOutputPath, readmeContent);
  console.log(`✅ README.md generated successfully at: ${readmeOutputPath}`);
  console.log(`📊 Unique icons documented: ${groupComponentsByBaseName(components).length}`);
  console.log(`🔗 GitHub URL: https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}`);

  // 6. Print next steps
  console.log("\n📋 NEXT STEPS:");
  console.log("1. Ensure all weight directories exist in src/raw/");
  console.log("2. Commit and push your SVG files to GitHub");
  console.log("3. Verify images work by checking the README on GitHub");
} catch (error) {
  console.error("❌ Error generating README:");
  console.error(error);
  process.exit(1);
}
