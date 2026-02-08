const fs = require("fs");
const path = require("path");

/* ---------------- CONFIG ---------------- */

const packageJsonPath = path.join(__dirname, "package.json");
const generatedIndexPath = path.join(__dirname, "dist", "index.ts");
const readmeOutputPath = path.join(__dirname, "README.md");
const rawDir = path.join(__dirname, "src", "raw");

const WEIGHTS = ["bold", "boldduotone", "broken", "lineduotone", "linear", "outline"];

const weightConfigs = {
  bold: { dir: "bold", label: "Bold" },
  boldduotone: { dir: "boldduotone", label: "Bold Duotone" },
  broken: { dir: "broken", label: "Broken" },
  lineduotone: { dir: "lineduotone", label: "Line Duotone" },
  linear: { dir: "linear", label: "Linear" },
  outline: { dir: "outline", label: "Outline" },
};

const GITHUB_USERNAME = "moamfar";
const GITHUB_REPO_NAME = "icon-pack";
const GITHUB_BRANCH = "main";

/* ---------------- UTILITIES ---------------- */

// Parse generated index.ts exports
function getExportedComponents(indexPath) {
  if (!fs.existsSync(indexPath)) return [];

  const content = fs.readFileSync(indexPath, "utf-8");
  const regex = /export\s+{\s*(\w+)\s*}\s+from\s+["'].+["'];/g;

  const components = [];
  let match;
  while ((match = regex.exec(content))) {
    components.push(match[1]);
  }

  return components.sort();
}

// Normalize names (remove spaces, lowercase)
function normalizeName(str) {
  return str.replace(/\s+/g, "").toLowerCase();
}

// Find icon and return GitHub RAW url
function getGithubIconUrl(componentName, weight) {
  const weightDir = path.join(rawDir, weightConfigs[weight].label);
  if (!fs.existsSync(weightDir)) return null;

  const normalizedComponent = normalizeName(componentName);

  const categories = fs.readdirSync(weightDir).filter((f) => fs.statSync(path.join(weightDir, f)).isDirectory());

  for (const category of categories) {
    const categoryPath = path.join(weightDir, category);
    const files = fs.readdirSync(categoryPath).filter((f) => f.toLowerCase().endsWith(".svg"));

    for (const file of files) {
      const normalizedFile = normalizeName(file.replace(".svg", ""));

      if (normalizedFile === normalizedComponent) {
        return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/${GITHUB_BRANCH}/src/raw/${weightConfigs[weight].label}/${category}/${file}`;
      }
    }
  }

  return null;
}

/* ---------------- README SECTIONS ---------------- */

function generateIconList(components) {
  if (!components.length) return "No icons found.";

  let html = `
<table style="border-collapse: collapse; width: 100%; min-width: 700px;">
  <thead>
    <tr style="background:#f8f9fa;border-bottom:2px solid #ddd;">
      <th style="text-align:left;padding:12px;width:35%;">Icon</th>
      <th style="text-align:center;padding:12px;">Weights Preview</th>
    </tr>
  </thead>
  <tbody>
`;

  components.forEach((name) => {
    const badges = WEIGHTS.map((w) => {
      const has = getGithubIconUrl(name, w);
      const cfg = weightConfigs[w];
      return `<span style="
        display:inline-block;
        margin:2px;
        padding:2px 8px;
        border-radius:12px;
        font-size:10px;
        border:1px solid ${has ? "#c7d2fe" : "#e5e7eb"};
        background:${has ? "#e0e7ff" : "#f3f4f6"};
        color:${has ? "#4338ca" : "#9ca3af"};
      ">${cfg.label}</span>`;
    }).join("");

    const previews = WEIGHTS.map((w) => {
      const src = getGithubIconUrl(name, w);
      const label = weightConfigs[w].label.slice(0, 3);
      return src
        ? `<div style="display:flex;flex-direction:column;align-items:center;">
             <img src="${src}" width="20" height="20" />
             <span style="font-size:8px;color:#999;">${label}</span>
           </div>`
        : `<div style="width:20px;height:20px;background:#eee;border-radius:3px;"></div>`;
    }).join("");

    html += `
<tr style="border-bottom:1px solid #eee;">
  <td style="padding:12px;">
    <code>${name}</code>
    <div style="margin-top:6px;">${badges}</div>
  </td>
  <td style="padding:12px;">
    <div style="display:flex;gap:8px;justify-content:center;
      background:#fafafa;padding:8px;border-radius:8px;border:1px solid #eee;">
      ${previews}
    </div>
  </td>
</tr>
`;
  });

  html += `
  </tbody>
</table>
`;

  return html;
}

function generateWeightLegend() {
  return `
### Weight Legend

<div style="display:flex;flex-wrap:wrap;gap:8px;">
${WEIGHTS.map(
  (w) => `<div style="padding:6px 10px;border:1px solid #e5e7eb;
    border-radius:6px;background:#f9fafb;">
    <strong>${weightConfigs[w].label}</strong>
    <span style="font-size:12px;color:#666;">( "${w}" )</span>
  </div>`,
).join("")}
</div>
`;
}

function generatePropsTable() {
  return `
## Component Props

| Prop | Type | Default | Description |
|-----|-----|--------|-------------|
| size | number | 24 | Icon size |
| color | string | currentColor | Icon color |
| weight | string | outline | Icon style |
| ...props | SVGAttributes | – | Standard SVG props |
`;
}

function generateUsage(pkgName, example) {
  return `
## Usage

\`\`\`tsx
import { ${example} } from "${pkgName}";

<${example} size={32} weight="bold" color="#4f46e5" />
\`\`\`
`;
}

/* ---------------- MAIN ---------------- */

try {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const components = getExportedComponents(generatedIndexPath);

  const readme = `
# ${pkg.name}

${pkg.description}

${generateWeightLegend()}

## Installation

\`\`\`bash
npm install ${pkg.name}
\`\`\`

${components.length ? generateUsage(pkg.name, components[0]) : ""}

${generatePropsTable()}

## Available Icons (${components.length})

${generateIconList(components)}

---

Made with ❤️ by **${GITHUB_USERNAME}**
`;

  fs.writeFileSync(readmeOutputPath, readme.trim());
  console.log("✅ README.md generated successfully");
} catch (err) {
  console.error("❌ Failed to generate README");
  console.error(err);
  process.exit(1);
}
