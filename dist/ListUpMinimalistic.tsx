import * as React from "react";
import { IconProps } from "./types";

// Weights available: bold, boldduotone, broken, lineduotone, linear, outline
const svgs = {
     "bold": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H20C20.4142 10.25 20.75 10.5858 20.75 11C20.75 11.4142 20.4142 11.75 20 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM17.0119 14.4306C17.2928 14.1898 17.7072 14.1898 17.9881 14.4306L21.4881 17.4306C21.8026 17.7001 21.839 18.1736 21.5694 18.4881C21.2999 18.8026 20.8264 18.839 20.5119 18.5694L17.5 15.9878L14.4881 18.5694C14.1736 18.839 13.7001 18.8026 13.4306 18.4881C13.161 18.1736 13.1974 17.7001 13.5119 17.4306L17.0119 14.4306ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z"/>
</svg>
`,
    "boldduotone": `
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H20C20.4142 10.25 20.75 10.5858 20.75 11C20.75 11.4142 20.4142 11.75 20 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z"/>
<path d="M17.0119 14.4306C17.2928 14.1898 17.7072 14.1898 17.9881 14.4306L21.4881 17.4306C21.8026 17.7001 21.839 18.1736 21.5695 18.4881C21.2999 18.8026 20.8264 18.839 20.5119 18.5694L17.5 15.9878L14.4881 18.5694C14.1736 18.839 13.7001 18.8026 13.4306 18.4881C13.161 18.1736 13.1974 17.7001 13.5119 17.4306L17.0119 14.4306Z"/>
</svg>
`,
    "broken": `
<path d="M20 11L3 11" stroke-width="1.5" stroke-linecap="round"/>
<path d="M11 16H3" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 18L17.5 15L21 18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 6L13.5 6M20 6L17.75 6" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    "lineduotone": `
<path opacity="0.5" d="M20 6L3 6" stroke-width="1.5" stroke-linecap="round"/>
<path opacity="0.5" d="M20 11L3 11" stroke-width="1.5" stroke-linecap="round"/>
<path opacity="0.5" d="M11 16H3" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 18L17.5 15L21 18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    "linear": `
<path d="M20 6L3 6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M20 11L3 11" stroke-width="1.5" stroke-linecap="round"/>
<path d="M11 16H3" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 18L17.5 15L21 18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
    "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H20C20.4142 10.25 20.75 10.5858 20.75 11C20.75 11.4142 20.4142 11.75 20 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM17.0119 14.4306C17.2928 14.1898 17.7072 14.1898 17.9881 14.4306L21.4881 17.4306C21.8026 17.7001 21.839 18.1736 21.5694 18.4881C21.2999 18.8026 20.8264 18.839 20.5119 18.5694L17.5 15.9878L14.4881 18.5694C14.1736 18.839 13.7001 18.8026 13.4306 18.4881C13.161 18.1736 13.1974 17.7001 13.5119 17.4306L17.0119 14.4306ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z"/>
</svg>
`,
};

export const ListUpMinimalistic: React.FC<IconProps> = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
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
