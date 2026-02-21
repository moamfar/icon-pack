"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBold = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M5 12H12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2H7.6087C6.16795 2 5 3.16795 5 4.6087V12ZM5 12H14C16.7614 12 19 14.2386 19 17C19 19.7614 16.7614 22 14 22H7.05882C5.92177 22 5 21.1371 5 20M5 12V15.9706" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "duotone": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 4.6087C4 2.61567 5.61567 1 7.6087 1H12C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13H4V4.6087ZM7.6087 3C6.72024 3 6 3.72024 6 4.6087V11H12C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3H7.6087Z" fill="currentColor"/>
<path opacity="0.5" d="M4 12.9998V19.941C4 21.6303 5.36948 22.9998 7.05882 22.9998H14C17.3137 22.9998 20 20.3135 20 16.9998C20 14.4257 18.3791 12.2303 16.1022 11.3784C15.0293 12.384 13.5866 12.9998 12 12.9998H14C16.2091 12.9998 18 14.7907 18 16.9998C18 19.209 16.2091 20.9998 14 20.9998H7.05882C6.47405 20.9998 6 20.5258 6 19.941V12.9998H4Z" fill="currentColor"/>
</svg>
`,
  "fill": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.6087 1C5.61567 1 4 2.61567 4 4.6087V19.9412C4 21.6305 5.36948 23 7.05882 23H14C17.3137 23 20 20.3137 20 17C20 14.4259 18.3791 12.2304 16.1022 11.3786C17.2702 10.2839 18 8.72715 18 7C18 3.68629 15.3137 1 12 1H7.6087ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3H7.6087C6.72024 3 6 3.72024 6 4.6087V11H12ZM6 13V19.9412C6 20.5259 6.47405 21 7.05882 21H14C16.2091 21 18 19.2091 18 17C18 14.7909 16.2091 13 14 13H6Z" fill="currentColor"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.6087 1.25C5.75374 1.25 4.25 2.75374 4.25 4.6087V19.9412C4.25 21.4924 5.50755 22.75 7.05882 22.75H14C17.1756 22.75 19.75 20.1756 19.75 17C19.75 14.3824 18.0008 12.1732 15.6076 11.4777C16.9142 10.4237 17.75 8.80946 17.75 7C17.75 3.82436 15.1756 1.25 12 1.25H7.6087ZM12 11.25C14.3472 11.25 16.25 9.34721 16.25 7C16.25 4.65279 14.3472 2.75 12 2.75H7.6087C6.58217 2.75 5.75 3.58217 5.75 4.6087V11.25H12ZM5.75 12.75V19.9412C5.75 20.664 6.33598 21.25 7.05882 21.25H14C16.3472 21.25 18.25 19.3472 18.25 17C18.25 14.6528 16.3472 12.75 14 12.75H5.75Z" fill="currentColor"/>
</svg>
`,
};
const TextBold = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
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
exports.TextBold = TextBold;
