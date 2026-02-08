"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndoLeftRound = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "bold": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.53033 3.46967C7.82322 3.76256 7.82322 4.23744 7.53033 4.53033L5.81066 6.25H15C18.1756 6.25 20.75 8.82436 20.75 12C20.75 15.1756 18.1756 17.75 15 17.75H8.00001C7.58579 17.75 7.25001 17.4142 7.25001 17C7.25001 16.5858 7.58579 16.25 8.00001 16.25H15C17.3472 16.25 19.25 14.3472 19.25 12C19.25 9.65279 17.3472 7.75 15 7.75H5.81066L7.53033 9.46967C7.82322 9.76256 7.82322 10.2374 7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L3.46967 7.53033C3.17678 7.23744 3.17678 6.76256 3.46967 6.46967L6.46967 3.46967C6.76256 3.17678 7.23744 3.17678 7.53033 3.46967Z" fill="currentColor"/>
</svg>
`,
  "boldDuotone": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.53033 3.46967C7.23744 3.17678 6.76256 3.17678 6.46967 3.46967L3.46967 6.46967C3.17678 6.76256 3.17678 7.23744 3.46967 7.53033L6.46967 10.5303C6.76256 10.8232 7.23744 10.8232 7.53033 10.5303C7.82322 10.2374 7.82322 9.76256 7.53033 9.46967L5.06066 7L7.53033 4.53033C7.82322 4.23744 7.82322 3.76256 7.53033 3.46967Z" fill="currentColor"/>
<path opacity="0.5" d="M5.81066 6.25H15C18.1756 6.25 20.75 8.82436 20.75 12C20.75 15.1756 18.1756 17.75 15 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H15C17.3472 16.25 19.25 14.3472 19.25 12C19.25 9.65279 17.3472 7.75 15 7.75H5.81066L5.06066 7L5.81066 6.25Z" fill="currentColor" opacity="0.4"/>
</svg>
`,
  "broken": `
<path d="M4 7H15C17.7614 7 20 9.23857 20 12C20 14.7614 17.7614 17 15 17M4 7L7 4M4 7L7 10M8.00001 17H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  "lineDuotone": `
<path d="M7 4L4 7L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.5" d="M4 7H15C17.7614 7 20 9.23857 20 12C20 14.7614 17.7614 17 15 17H8.00001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "linear": `
<path d="M4 7H15C17.7614 7 20 9.23857 20 12C20 14.7614 17.7614 17 15 17H8.00001M4 7L7 4M4 7L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.53033 3.46967C7.82322 3.76256 7.82322 4.23744 7.53033 4.53033L5.81066 6.25H15C18.1756 6.25 20.75 8.82436 20.75 12C20.75 15.1756 18.1756 17.75 15 17.75H8.00001C7.58579 17.75 7.25001 17.4142 7.25001 17C7.25001 16.5858 7.58579 16.25 8.00001 16.25H15C17.3472 16.25 19.25 14.3472 19.25 12C19.25 9.65279 17.3472 7.75 15 7.75H5.81066L7.53033 9.46967C7.82322 9.76256 7.82322 10.2374 7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L3.46967 7.53033C3.17678 7.23744 3.17678 6.76256 3.46967 6.46967L6.46967 3.46967C6.76256 3.17678 7.23744 3.17678 7.53033 3.46967Z" fill="currentColor"/>
</svg>
`,
};

const UndoLeftRound = ({ size = 24, color = "currentColor", weight = "outline", className = "", style = {}, ...props }) => {
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

exports.UndoLeftRound = UndoLeftRound;
