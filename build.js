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

// Clean category name (remove spaces, commas, special chars)
const cleanCategoryName = (str) => {
  return str
    .replace(/[^a-zA-Z0-9]+/g, "") // Remove all non-alphanumeric
    .replace(/^\d+/, "") // Remove leading numbers
    .trim();
};

// Parse SVG
function parseSvg(svgString) {
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 256 256";

  let content = svgString.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");

  // Remove hardcoded fills/strokes (except none)
  content = content.replace(/\sfill="[^"]*"/g, (match) => {
    return match.includes("none") ? match : "";
  });

  content = content.replace(/\sstroke="[^"]*"/g, (match) => {
    return match.includes("none") ? match : "";
  });

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

// Discover all icons across all weights and categories
const iconRegistry = new Map(); // key: category/name combination
const categoryRegistry = new Map(); // category -> array of icons
const nameCounter = new Map(); // name -> count for deduplication
const originalToCleanCategory = new Map(); // Track original -> clean category names

weightFolders.forEach((folderWeight) => {
  const weightPath = path.join(rawDir, folderWeight);
  const categories = fs.readdirSync(weightPath).filter((file) => {
    return fs.statSync(path.join(weightPath, file)).isDirectory();
  });

  categories.forEach((originalCategory) => {
    // Clean the category name
    const cleanCategory = cleanCategoryName(originalCategory);
    if (!cleanCategory) {
      console.warn(`⚠️ Skipping empty category name from: "${originalCategory}"`);
      return;
    }

    // Store mapping
    originalToCleanCategory.set(originalCategory, cleanCategory);

    const categoryPath = path.join(weightPath, originalCategory);
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith(".svg"));

    files.forEach((filename) => {
      const rawName = filename.replace(".svg", "");
      const baseComponentName = toPascalCase(rawName);

      // Track name occurrences for deduplication
      if (!nameCounter.has(baseComponentName)) {
        nameCounter.set(baseComponentName, new Set());
      }
      nameCounter.get(baseComponentName).add(cleanCategory);

      // Create unique key: category + name
      const iconKey = `${cleanCategory}/${baseComponentName}`;

      if (!iconRegistry.has(iconKey)) {
        iconRegistry.set(iconKey, {
          originalCategory,
          cleanCategory,
          baseName: baseComponentName,
          originalFilename: filename,
          weights: new Map(), // weight -> svg content
        });

        // Initialize category registry
        if (!categoryRegistry.has(cleanCategory)) {
          categoryRegistry.set(cleanCategory, []);
        }
        categoryRegistry.get(cleanCategory).push(iconKey);
      }

      // Store weight info
      const codeWeight = weightMap.get(folderWeight);
      const filePath = path.join(weightPath, originalCategory, filename);

      if (fs.existsSync(filePath)) {
        const svgContent = fs.readFileSync(filePath, "utf-8");
        const parsed = parseSvg(svgContent);

        const iconData = iconRegistry.get(iconKey);
        iconData.weights.set(codeWeight, {
          content: parsed.content,
          viewBox: parsed.viewBox,
        });
      }
    });
  });
});

// Log category cleaning results
console.log("\n📁 Category name cleaning:");
originalToCleanCategory.forEach((clean, original) => {
  if (clean !== original) {
    console.log(`   "${original}" -> "${clean}"`);
  }
});

// Handle duplicate names by adding category prefix
const finalIcons = new Map(); // final component name -> icon data
const exportStatements = [];
const allIcons = [];

iconRegistry.forEach((iconData, iconKey) => {
  const [cleanCategory, baseName] = iconKey.split("/");
  const categoriesForName = Array.from(nameCounter.get(baseName) || []);

  let finalComponentName = baseName;

  // If same name appears in multiple categories, add category suffix
  if (categoriesForName.length > 1) {
    // Create a meaningful suffix from clean category
    const categorySuffix = cleanCategory
      .replace(/([a-z])([A-Z])/g, "$1$2") // Ensure camel case
      .replace(/^[a-z]/, (c) => c.toUpperCase()); // Capitalize first letter

    finalComponentName = `${baseName}${categorySuffix}`;
    console.log(`🔀 Renaming duplicate: ${baseName} -> ${finalComponentName} (category: ${cleanCategory})`);
  }

  // Ensure unique final name
  let uniqueName = finalComponentName;
  let counter = 1;
  while (finalIcons.has(uniqueName)) {
    uniqueName = `${finalComponentName}${counter}`;
    counter++;
  }

  finalIcons.set(uniqueName, {
    ...iconData,
    finalName: uniqueName,
    originalBaseName: baseName,
  });

  allIcons.push(uniqueName);
});

console.log(`\n🎨 Discovered ${iconRegistry.size} unique icons across ${categoryRegistry.size} categories`);
console.log(`📊 After deduplication: ${finalIcons.size} component names`);

// Create dist directory structure
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create category directories
categoryRegistry.forEach((_, category) => {
  const categoryDir = path.join(outputDir, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
});

// Generate each icon component
finalIcons.forEach((iconData, componentName) => {
  const { cleanCategory, weights, originalBaseName } = iconData;
  const categoryDir = path.join(outputDir, cleanCategory);

  if (weights.size === 0) {
    console.warn(`⚠️ Skipping ${componentName}: No SVG files found for any weight`);
    return;
  }

  // Get shared viewBox (use first weight's viewBox)
  const firstWeight = Array.from(weights.keys())[0];
  const sharedViewBox = weights.get(firstWeight).viewBox;

  // Create weight mapping string
  const weightMapString = Array.from(weights.entries())
    .map(([weight, data]) => `  "${weight}": \`${(data.content || "").replace(/`/g, "\\`")}\`,`)
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
const ${componentName} = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    return (react_1.default.createElement("svg", Object.assign({ viewBox: "${sharedViewBox}", width: size, height: size, fill: color }, props),
        react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } })));
};
exports.${componentName} = ${componentName};
`;

  // Write JS file in category directory
  const jsFilePath = path.join(categoryDir, `${componentName}.js`);
  fs.writeFileSync(jsFilePath, jsContent);

  // Add export statement with relative path
  exportStatements.push(`exports.${componentName} = require('./${cleanCategory}/${componentName}').${componentName};`);

  // Generate TypeScript declaration file
  const dtsContent = `import * as React from "react";
import { IconProps } from "../types";

export declare const ${componentName}: React.FC<IconProps>;
`;
  const dtsFilePath = path.join(categoryDir, `${componentName}.d.ts`);
  fs.writeFileSync(dtsFilePath, dtsContent);
});

// Create index.js
const indexJs = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
${exportStatements.join("\n")}
`;
fs.writeFileSync(path.join(outputDir, "index.js"), indexJs);

// Create index.d.ts with category exports
const categoryExports = [];
categoryRegistry.forEach((iconKeys, category) => {
  const iconsInCategory = iconKeys
    .map((key) => {
      const iconData = iconRegistry.get(key);
      const finalName = Array.from(finalIcons.entries()).find(
        ([_, data]) => data.cleanCategory === category && data.originalBaseName === iconData.baseName,
      )?.[0];
      return finalName;
    })
    .filter(Boolean);

  if (iconsInCategory.length > 0) {
    categoryExports.push(`// ${category} Icons`);
    iconsInCategory.forEach((iconName) => {
      categoryExports.push(`export { ${iconName} } from "./${category}/${iconName}";`);
    });
    categoryExports.push(""); // Empty line between categories
  }
});

const indexDts = `export * from "./types";

// All Icons by Category
${categoryExports.join("\n")}

// Individual icon exports
${allIcons
  .map((name) => {
    const category = finalIcons.get(name).cleanCategory;
    return `export { ${name} } from "./${category}/${name}";`;
  })
  .join("\n")}
`;
fs.writeFileSync(path.join(outputDir, "index.d.ts"), indexDts);

// Copy types.ts to root
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
const indexEsmExports = allIcons
  .map((name) => {
    const category = finalIcons.get(name).cleanCategory;
    return `export { ${name} } from "./${category}/${name}.js";`;
  })
  .join("\n");

const indexEsm = `${indexEsmExports}
`;
fs.writeFileSync(path.join(outputDir, "index.esm.js"), indexEsm);

// Create category index files
categoryRegistry.forEach((iconKeys, category) => {
  const categoryDir = path.join(outputDir, category);
  const iconsInCategory = iconKeys
    .map((key) => {
      const iconData = iconRegistry.get(key);
      const finalName = Array.from(finalIcons.entries()).find(
        ([_, data]) => data.cleanCategory === category && data.originalBaseName === iconData.baseName,
      )?.[0];
      return finalName;
    })
    .filter(Boolean);

  if (iconsInCategory.length > 0) {
    // Category index.js
    const categoryIndexJs = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
${iconsInCategory.map((name) => `exports.${name} = require('./${name}').${name};`).join("\n")}
`;
    fs.writeFileSync(path.join(categoryDir, "index.js"), categoryIndexJs);

    // Category index.d.ts
    const categoryIndexDts = `${iconsInCategory.map((name) => `export { ${name} } from "./${name}";`).join("\n")}
`;
    fs.writeFileSync(path.join(categoryDir, "index.d.ts"), categoryIndexDts);

    // Category index.esm.js
    const categoryIndexEsm = `${iconsInCategory.map((name) => `export { ${name} } from "./${name}.js";`).join("\n")}
`;
    fs.writeFileSync(path.join(categoryDir, "index.esm.js"), categoryIndexEsm);
  }
});

// Create a category mapping file
const categoryMapping = Array.from(originalToCleanCategory.entries()).map(([original, clean]) => ({
  original,
  clean,
}));

const mappingContent = `// Category name mapping
export const CATEGORY_MAPPING = ${JSON.stringify(categoryMapping, null, 2)};

export const CATEGORIES = ${JSON.stringify(Array.from(categoryRegistry.keys()).sort(), null, 2)};

export const ICON_COUNT = ${allIcons.length};
`;

fs.writeFileSync(path.join(outputDir, "categories.js"), mappingContent);
fs.writeFileSync(
  path.join(outputDir, "categories.d.ts"),
  `export declare const CATEGORY_MAPPING: Array<{original: string, clean: string}>;
export declare const CATEGORIES: string[];
export declare const ICON_COUNT: number;
`,
);

console.log(`\n✅ Build complete! Generated ${allIcons.length} icons in ${categoryRegistry.size} categories`);
console.log(`📁 Output structure:`);
console.log(`   dist/`);
console.log(`   ├── index.js`);
console.log(`   ├── index.d.ts`);
console.log(`   ├── index.esm.js`);
console.log(`   ├── types.ts`);
console.log(`   ├── categories.js`);
console.log(`   ├── categories.d.ts`);
categoryRegistry.forEach((_, category) => {
  const iconCount = categoryRegistry.get(category).length;
  console.log(`   ├── ${category}/`);
  console.log(`   │   ├── index.js`);
  console.log(`   │   ├── index.d.ts`);
  console.log(`   │   ├── index.esm.js`);
  console.log(`   │   └── ${iconCount} icon files`);
});

// Generate a summary report
console.log(`\n📊 Summary Report:`);
categoryRegistry.forEach((iconKeys, category) => {
  const iconCount = iconKeys.length;
  console.log(`   ${category}: ${iconCount} icons`);
});

// Show example imports
console.log(`\n💡 Example imports:`);
console.log(`   // Import any icon`);
console.log(`   import { ${allIcons[0]}, ${allIcons[1] || ""} } from '@moamfar/icon-pack';`);
console.log(`   `);
console.log(`   // Import from specific category`);
if (Array.from(categoryRegistry.keys())[0]) {
  const firstCategory = Array.from(categoryRegistry.keys())[0];
  const firstIconInCategory = categoryRegistry.get(firstCategory)?.[0]?.split("/")[1];
  console.log(`   import { ${firstIconInCategory} } from '@moamfar/icon-pack/${firstCategory}';`);
}

console.log("\n🧠 Generating IntelliSense files...");
try {
  require("./generate-enhanced-types.js");
  console.log("✅ IntelliSense files generated successfully");
} catch (error) {
  console.error("❌ Failed to generate IntelliSense files:", error.message);
}
