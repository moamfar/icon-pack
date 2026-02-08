import * as React from "react";
import { IconProps } from "./types";

// Weights available: bold, boldduotone, broken, lineduotone, linear, outline
const svgs = {
     "bold": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"/>
</svg>
`,
    "boldduotone": `
<path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"/>
<path d="M15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12Z"/>
</svg>
`,
    "broken": `
<path d="M15 12H9" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    "lineduotone": `
<circle opacity="0.5" cx="12" cy="12" r="10" stroke-width="1.5"/>
<path d="M15 12H9" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    "linear": `
<circle cx="12" cy="12" r="10" stroke-width="1.5"/>
<path d="M15 12H9" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    "outline": `
<path d="M15 12.75C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H15Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"/>
</svg>
`,
};

export const MinusCircle: React.FC<IconProps> = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
  // If weight is passed and exists, use it. Otherwise default to the first available weight.
  const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      {...props}
    >
      <g dangerouslySetInnerHTML={{ __html: svgs[activeWeight] }} />
    </svg>
  );
};
