const fs = require("fs");
const path = require("path");

// --- CONFIGURATION ---
const packageJsonPath = path.join(__dirname, "package.json");
const generatedIndexPath = path.join(__dirname, "src", "generated", "index.ts");
const readmeOutputPath = path.join(__dirname, "README.md");
const rawIconsDir = path.join(__dirname, "src", "raw", "outline");

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

// 2. Find the actual SVG filename (case-insensitive)
function findSvgFilename(componentName) {
  // Common naming patterns
  const candidates = [
    `${componentName}.svg`,
    `${componentName.toLowerCase()}.svg`,
    `${componentName.charAt(0).toLowerCase() + componentName.slice(1)}.svg`,
    `${componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}.svg`,
  ];

  for (const filename of candidates) {
    const fullPath = path.join(rawIconsDir, filename);
    if (fs.existsSync(fullPath)) {
      return filename;
    }
  }

  // Try to list files and find a match
  try {
    const files = fs.readdirSync(rawIconsDir);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    // Try case-insensitive match
    const lowerName = componentName.toLowerCase();
    for (const file of svgFiles) {
      const fileNameWithoutExt = path.basename(file, ".svg").toLowerCase();
      if (fileNameWithoutExt === lowerName) {
        return file;
      }
    }

    // Try partial match
    for (const file of svgFiles) {
      const fileNameWithoutExt = path.basename(file, ".svg").toLowerCase();
      if (fileNameWithoutExt.includes(lowerName) || lowerName.includes(fileNameWithoutExt)) {
        return file;
      }
    }
  } catch (error) {
    console.warn(`Could not read directory ${rawIconsDir}:`, error.message);
  }

  return null;
}

// 3. Get Markdown-formatted icon for README
function getReadmeIcon(componentName) {
  const svgFilename = findSvgFilename(componentName);

  if (!svgFilename) {
    console.warn(`⚠️ Could not find SVG for component: ${componentName}`);
    return `\`${componentName}\``;
  }

  // GitHub raw URL format
  const githubRawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/${GITHUB_BRANCH}/src/raw/outline/${svgFilename}`;

  // Return Markdown image syntax (works on both GitHub and npm)
  return `![${componentName}](${githubRawUrl}?sanitize=true)`;
}

// 4. Generate Markdown Table for Icons
function generateIconList(components) {
  if (components.length === 0) return "**No icons found.**";

  let markdown = "| Preview | Name | Preview | Name |\n";
  markdown += "|:---:|:---|:---:|:---|\n";

  for (let i = 0; i < components.length; i += 2) {
    const name1 = components[i];
    const name2 = components[i + 2] ? components[i + 2] : components[i + 1]; // Better column distribution

    const icon1 = getReadmeIcon(name1);
    const icon2 = name2 ? getReadmeIcon(name2) : "";

    // Add width and height attributes using HTML in Markdown
    const icon1WithSize = `<img src="${icon1.replace("![", "").replace("]", "").split("(")[1].replace(")", "")}" width="24" height="24" />`;
    const icon2WithSize = icon2
      ? `<img src="${icon2.replace("![", "").replace("]", "").split("(")[1].replace(")", "")}" width="24" height="24" />`
      : "";

    markdown += `| ${icon1WithSize} | \`${name1}\` | ${icon2WithSize} | ${name2 ? `\`${name2}\`` : ""} |\n`;
  }

  return markdown;
}

// 5. Generate Props Table
function generatePropsTable() {
  return `
## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`size\` | \`number\` | \`24\` | Sets the width and height of the icon |
| \`color\` | \`string\` | \`"currentColor"\` | Sets the fill color |
| \`weight\` | \`"outline" \| "bold"\` | \`"outline"\` | Switches between the icon styles |
| \`...props\` | \`SVGAttributes\` | \`-\` | Standard SVG props like \`className\`, \`id\`, etc. |
`;
}

// 6. Generate Installation Section
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

// 7. Generate Usage Examples
function generateUsageExamples(pkgName, components) {
  const exampleComponents = components.slice(0, 3);

  if (exampleComponents.length < 3) {
    return `
## Usage

Import the icons you need and use them as React components:

\`\`\`tsx
import { ${exampleComponents.join(", ")} } from "${pkgName}";

function App() {
  return (
    <div>
      ${exampleComponents.map((comp) => `<${comp} size={32} color="#333" />`).join("\n      ")}
    </div>
  );
}
\`\`\`
`;
  }

  return `
## Usage

Import the icons you need and use them as React components:

\`\`\`tsx
import { ${exampleComponents[0]}, ${exampleComponents[1]}, ${exampleComponents[2]} } from "${pkgName}";

function App() {
  return (
    <div>
      <${exampleComponents[0]} size={32} color="#333" />
      <${exampleComponents[1]} size={32} color="blue" weight="bold" />
      <${exampleComponents[2]} size={48} className="text-red-500" />
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
  let pkgDesc = "A collection of beautiful SVG icons.";
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
  }

  // 3. Generate Sections
  console.log("🛠️ Generating README sections...");
  const iconListSection = generateIconList(components);
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

${pkgDesc}

## Features

- **🌳 Tree-shakable:** Only import the icons you use
- **🎨 Customizable:** Control size, color, and weight (Outline/Bold) easily
- **✨ TypeScript:** Built with full type safety support
- **🛠 Framework Agnostic:** Works with React, Next.js, Vite, and CRA
- **⚡ Zero Dependencies:** Lightweight footprint
- **🎯 Perfect for Design Systems:** Consistent and scalable

${installationSection}

${usageSection}

${propsTableSection}

## Available Icons

There are currently **${components.length}** icons available:

${iconListSection}

## Contributing

We welcome contributions! If you'd like to add new icons or improve existing ones:

1. Fork the repository
2. Create a new branch
3. Add your SVG icons to the \`src/raw/outline/\` directory
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
npm run generate-readme
\`\`\`

## Related Projects

- [React Icons](https://react-icons.github.io/react-icons/) - Popular icon library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Heroicons](https://heroicons.com/) - Handcrafted SVG icons

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
  console.log(`📊 Total icons documented: ${components.length}`);
  console.log(`🔗 GitHub URL: https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}`);

  // 6. Print next steps
  console.log("\n📋 NEXT STEPS:");
  console.log("1. Update GITHUB_USERNAME and GITHUB_REPO_NAME at the top of this script");
  console.log("2. Commit and push your SVG files to GitHub");
  console.log("3. Verify images work by checking the README on GitHub");
} catch (error) {
  console.error("❌ Error generating README:");
  console.error(error);
  process.exit(1);
}
