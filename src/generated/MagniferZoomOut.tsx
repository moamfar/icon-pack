import * as React from "react";
import { IconProps } from "./types";

// Weights available: bold, boldduotone, broken, lineduotone, linear, outline
const svgs = {
     "bold": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.7883 21.7883C22.0706 21.506 22.0706 21.0483 21.7883 20.7659L18.1224 17.1002C19.4884 15.5007 20.3133 13.425 20.3133 11.1566C20.3133 6.09956 16.2137 2 11.1566 2C6.09956 2 2 6.09956 2 11.1566C2 16.2137 6.09956 20.3133 11.1566 20.3133C13.4249 20.3133 15.5006 19.4885 17.1 18.1225L20.7659 21.7883C21.0483 22.0706 21.506 22.0706 21.7883 21.7883ZM8.0241 11.1566C8.0241 10.7574 8.34775 10.4337 8.74699 10.4337H13.5663C13.9655 10.4337 14.2892 10.7574 14.2892 11.1566C14.2892 11.5559 13.9655 11.8795 13.5663 11.8795H8.74699C8.34775 11.8795 8.0241 11.5559 8.0241 11.1566Z"/>
</svg>
`,
    "boldduotone": `
<g opacity="0.5">
<path d="M11.1566 20.3133C16.2137 20.3133 20.3133 16.2137 20.3133 11.1566C20.3133 6.09956 16.2137 2 11.1566 2C6.09956 2 2 6.09956 2 11.1566C2 16.2137 6.09956 20.3133 11.1566 20.3133Z"/>
</g>
<path d="M17.1001 18.1224C17.4671 17.809 17.809 17.4671 18.1224 17.1001L21.7887 20.7664C22.071 21.0487 22.071 21.5064 21.7887 21.7887C21.5064 22.071 21.0487 22.071 20.7664 21.7887L17.1001 18.1224Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.02393 11.1565C8.02393 10.7572 8.34758 10.4336 8.74682 10.4336H13.5661C13.9653 10.4336 14.289 10.7572 14.289 11.1565C14.289 11.5557 13.9653 11.8794 13.5661 11.8794H8.74682C8.34758 11.8794 8.02393 11.5557 8.02393 11.1565Z"/>
</svg>
`,
    "broken": `
<path d="M18.5 18.5L22 22" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 11.5H11.5H14" stroke-width="1.5" stroke-linecap="round"/>
<path d="M6.75 3.27093C8.14732 2.46262 9.76964 2 11.5 2C16.7467 2 21 6.25329 21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 9.76964 2.46262 8.14732 3.27093 6.75" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    "lineduotone": `
<circle cx="11.5" cy="11.5" r="9.5" stroke-width="1.5"/>
<path d="M18.5 18.5L22 22" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 11.5H11.5H14" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    "linear": `
<circle cx="11.5" cy="11.5" r="9.5" stroke-width="1.5"/>
<path d="M18.5 18.5L22 22" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 11.5H11.5H14" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
    "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5ZM8.25 11.5C8.25 11.0858 8.58579 10.75 9 10.75H14C14.4142 10.75 14.75 11.0858 14.75 11.5C14.75 11.9142 14.4142 12.25 14 12.25H9C8.58579 12.25 8.25 11.9142 8.25 11.5Z"/>
</svg>
`,
};

export const MagniferZoomOut: React.FC<IconProps> = ({ size = 24, color = "currentColor", weight, ...props }) => {
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
