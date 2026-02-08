"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List1 = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "bold": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 7C3.25 6.58579 3.58579 6.25 4 6.25H20C20.4142 6.25 20.75 6.58579 20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H4C3.58579 7.75 3.25 7.41421 3.25 7ZM3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12ZM3.25 17C3.25 16.5858 3.58579 16.25 4 16.25H9C9.41421 16.25 9.75 16.5858 9.75 17C9.75 17.4142 9.41421 17.75 9 17.75H4C3.58579 17.75 3.25 17.4142 3.25 17Z" fill="currentColor"/>
</svg>
`,
  "boldDuotone": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 7C3.25 6.58579 3.58579 6.25 4 6.25H20C20.4142 6.25 20.75 6.58579 20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H4C3.58579 7.75 3.25 7.41421 3.25 7Z" fill="currentColor"/>
<path opacity="0.7" d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z" fill="currentColor" opacity="0.4"/>
<path opacity="0.4" d="M3.25 17C3.25 16.5858 3.58579 16.25 4 16.25H9C9.41421 16.25 9.75 16.5858 9.75 17C9.75 17.4142 9.41421 17.75 9 17.75H4C3.58579 17.75 3.25 17.4142 3.25 17Z" fill="currentColor" opacity="0.4"/>
</svg>
`,
  "broken": `
<path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 17H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "lineDuotone": `
<path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path opacity="0.7" d="M15 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path opacity="0.4" d="M9 17H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "linear": `
<path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M9 17H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 7C3.25 6.58579 3.58579 6.25 4 6.25H20C20.4142 6.25 20.75 6.58579 20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H4C3.58579 7.75 3.25 7.41421 3.25 7ZM3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12ZM3.25 17C3.25 16.5858 3.58579 16.25 4 16.25H9C9.41421 16.25 9.75 16.5858 9.75 17C9.75 17.4142 9.41421 17.75 9 17.75H4C3.58579 17.75 3.25 17.4142 3.25 17Z" fill="currentColor"/>
</svg>
`,
};

const List1 = ({ size = 24, color = "currentColor", weight = "outline", className = "", style = {}, ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    
    const svgProps = {
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        fill: "currentColor",
        stroke: "currentColor",
        className: className,
        style: { color, ...style },
        ...props
    };
    
    return (react_1.default.createElement("svg", svgProps,
        react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } })));
};

exports.List1 = List1;
