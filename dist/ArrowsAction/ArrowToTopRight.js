"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowToTopRight = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M12 4.5L7 9.5M12 4.5L17 9.5M12 4.5L12 11M12 14.5C12 16.1667 13 19.5 17 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  "duotone": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.46967 10.0303C6.17678 9.73744 6.17678 9.26256 6.46967 8.96967L11.4697 3.96967C11.7626 3.67678 12.2374 3.67678 12.5303 3.96967L17.5303 8.96967C17.8232 9.26256 17.8232 9.73744 17.5303 10.0303C17.2374 10.3232 16.7626 10.3232 16.4697 10.0303L12 5.56066L7.53033 10.0303C7.23744 10.3232 6.76256 10.3232 6.46967 10.0303Z" fill="currentColor"/>
<g opacity="0.5">
<path d="M11.25 14.5C11.25 15.4534 11.5298 16.8667 12.3913 18.0632C13.2804 19.298 14.7556 20.25 17 20.25C17.4142 20.25 17.75 19.9142 17.75 19.5C17.75 19.0858 17.4142 18.75 17 18.75C15.2444 18.75 14.2196 18.0353 13.6087 17.1868C12.9702 16.3 12.75 15.2133 12.75 14.5L12.75 6.31066L12 5.56066L11.25 6.31066V14.5Z" fill="currentColor"/>
<path d="M11.8023 3.77639C11.9568 3.73435 12.122 3.74254 12.2722 3.80095C12.1879 3.76805 12.096 3.75 12 3.75C11.9316 3.75 11.8653 3.75919 11.8023 3.77639Z" fill="currentColor"/>
</g>
</svg>
`,
  "fill": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.46967 10.0303C6.17678 9.73744 6.17678 9.26256 6.46967 8.96967L11.4697 3.96967C11.7626 3.67678 12.2374 3.67678 12.5303 3.96967L17.5303 8.96967C17.8232 9.26256 17.8232 9.73744 17.5303 10.0303C17.2374 10.3232 16.7626 10.3232 16.4697 10.0303L12.75 6.31066L12.75 14.5C12.75 15.2133 12.9702 16.3 13.6087 17.1868C14.2196 18.0353 15.2444 18.75 17 18.75C17.4142 18.75 17.75 19.0858 17.75 19.5C17.75 19.9142 17.4142 20.25 17 20.25C14.7556 20.25 13.2804 19.298 12.3913 18.0632C11.5298 16.8667 11.25 15.4534 11.25 14.5L11.25 6.31066L7.53033 10.0303C7.23744 10.3232 6.76256 10.3232 6.46967 10.0303Z" fill="currentColor"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.46967 10.0303C6.17678 9.73744 6.17678 9.26256 6.46967 8.96967L11.4697 3.96967C11.7626 3.67678 12.2374 3.67678 12.5303 3.96967L17.5303 8.96967C17.8232 9.26256 17.8232 9.73744 17.5303 10.0303C17.2374 10.3232 16.7626 10.3232 16.4697 10.0303L12.75 6.31066L12.75 14.5C12.75 15.2133 12.9702 16.3 13.6087 17.1868C14.2196 18.0353 15.2444 18.75 17 18.75C17.4142 18.75 17.75 19.0858 17.75 19.5C17.75 19.9142 17.4142 20.25 17 20.25C14.7556 20.25 13.2804 19.298 12.3913 18.0632C11.5298 16.8667 11.25 15.4534 11.25 14.5L11.25 6.31066L7.53033 10.0303C7.23744 10.3232 6.76256 10.3232 6.46967 10.0303Z" fill="currentColor"/>
</svg>
`,
};
const ArrowToTopRight = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = svgs[weight] ? weight : Object.keys(svgs)[0];
   return (
  react_1.default.createElement(
    "svg",
    Object.assign(
      {
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        color: color,      
        fill: "none"      
      },
      props
    ),
    react_1.default.createElement("g", {
      dangerouslySetInnerHTML: { __html: svgs[activeWeight] }
    })
  )
);
};
exports.ArrowToTopRight = ArrowToTopRight;
