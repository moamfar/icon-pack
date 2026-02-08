import * as React from "react";
import { IconProps } from "./types";

// Weights available: bold, boldduotone, broken, lineduotone, linear, outline
const svgs = {
     "bold": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H12C12.4142 10.25 12.75 10.5858 12.75 11C12.75 11.4142 12.4142 11.75 12 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303L20.5303 15.0303C20.8232 14.7374 20.8232 14.2626 20.5303 13.9697C20.2374 13.6768 19.7626 13.6768 19.4697 13.9697L18.25 15.1893V9C18.25 8.58579 17.9142 8.25 17.5 8.25C17.0858 8.25 16.75 8.58579 16.75 9V15.1893L15.5303 13.9697C15.2374 13.6768 14.7626 13.6768 14.4697 13.9697C14.1768 14.2626 14.1768 14.7374 14.4697 15.0303L16.9697 17.5303Z"/>
</svg>
`,
    "boldduotone": `
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H12C12.4142 10.25 12.75 10.5858 12.75 11C12.75 11.4142 12.4142 11.75 12 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303L20.5303 15.0303C20.8232 14.7374 20.8232 14.2626 20.5303 13.9697C20.2374 13.6768 19.7626 13.6768 19.4697 13.9697L18.25 15.1893V9C18.25 8.58579 17.9142 8.25 17.5 8.25C17.0858 8.25 16.75 8.58579 16.75 9V15.1893L15.5303 13.9697C15.2374 13.6768 14.7626 13.6768 14.4697 13.9697C14.1768 14.2626 14.1768 14.7374 14.4697 15.0303L16.9697 17.5303Z"/>
</svg>
`,
    "broken": `
<path d="M11 16L3 16" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 11L3 11" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 14.5L17.5 17M17.5 17L20 14.5M17.5 17V9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 6L13.5 6M20 6L17.75 6" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    "lineduotone": `
<path opacity="0.5" d="M20 6L3 6" stroke-width="1.5" stroke-linecap="round"/>
<path opacity="0.5" d="M11 16L3 16" stroke-width="1.5" stroke-linecap="round"/>
<path opacity="0.5" d="M12 11L3 11" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 14.5L17.5 17M17.5 17L20 14.5M17.5 17V9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    "linear": `
<path d="M20 6L3 6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M11 16L3 16" stroke-width="1.5" stroke-linecap="round"/>
<path d="M12 11L3 11" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 14.5L17.5 17M17.5 17L20 14.5M17.5 17V9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM17.5 8.25C17.9142 8.25 18.25 8.58579 18.25 9V15.1893L19.4697 13.9697C19.7626 13.6768 20.2374 13.6768 20.5303 13.9697C20.8232 14.2626 20.8232 14.7374 20.5303 15.0303L18.0303 17.5303C17.7374 17.8232 17.2626 17.8232 16.9697 17.5303L14.4697 15.0303C14.1768 14.7374 14.1768 14.2626 14.4697 13.9697C14.7626 13.6768 15.2374 13.6768 15.5303 13.9697L16.75 15.1893V9C16.75 8.58579 17.0858 8.25 17.5 8.25ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H12C12.4142 10.25 12.75 10.5858 12.75 11C12.75 11.4142 12.4142 11.75 12 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z"/>
</svg>
`,
};

export const ListArrowDownMinimalistic: React.FC<IconProps> = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
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
