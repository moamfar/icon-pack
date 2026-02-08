"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) { return (mod && mod.__esModule) ? mod : { "default": mod }; };
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextItalic = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "bold": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9768 0.999775H9C8.44772 0.999775 8 1.44749 8 1.99977C8 2.55206 8.44772 2.99977 9 2.99977H13.656L8.25597 20.9998H3C2.44772 20.9998 2 21.4475 2 21.9998C2 22.5521 2.44772 22.9998 3 22.9998H8.97753C8.99281 23.0001 9.00805 23.0001 9.02325 22.9998H15C15.5523 22.9998 16 22.5521 16 21.9998C16 21.4475 15.5523 20.9998 15 20.9998H10.344L15.744 2.99977H21C21.5523 2.99977 22 2.55206 22 1.99977C22 1.44749 21.5523 0.999775 21 0.999775H15.0225C15.0072 0.999423 14.992 0.999425 14.9768 0.999775Z" fill="currentColor"/>
</svg>
`,
  "boldDuotone": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 0.999775H14.9768C14.992 0.999425 15.0072 0.999423 15.0225 0.999775H21C21.5523 0.999775 22 1.44749 22 1.99977C22 2.55206 21.5523 2.99977 21 2.99977H15.744H13.656H9C8.44772 2.99977 8 2.55206 8 1.99977C8 1.44749 8.44772 0.999775 9 0.999775ZM8.25597 20.9998H3C2.44772 20.9998 2 21.4475 2 21.9998C2 22.5521 2.44772 22.9998 3 22.9998H8.97753C8.99281 23.0001 9.00805 23.0001 9.02325 22.9998H15C15.5523 22.9998 16 22.5521 16 21.9998C16 21.4475 15.5523 20.9998 15 20.9998H10.344H8.25597Z" fill="currentColor"/>
<path opacity="0.5" d="M13.6559 3L8.25586 21H10.3439L15.7439 3H13.6559Z" fill="currentColor" opacity="0.4"/>
</svg>
`,
  "broken": `
<path d="M3 22H15M9 2H21M9 22L11.4 14M15 2L12.6 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  "lineDuotone": `
<path d="M3 22H15M9 2H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.5" d="M9 22L15 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  "linear": `
<path d="M3 22H15M9 2H21M9 22L15 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.9826 1.2502H9C8.58579 1.2502 8.25 1.58598 8.25 2.0002C8.25 2.41441 8.58579 2.7502 9 2.7502H13.992L8.44198 21.2502H3C2.58579 21.2502 2.25 21.586 2.25 22.0002C2.25 22.4144 2.58579 22.7502 3 22.7502H8.98314C8.9946 22.7505 9.00604 22.7505 9.01744 22.7502H15C15.4142 22.7502 15.75 22.4144 15.75 22.0002C15.75 21.586 15.4142 21.2502 15 21.2502H10.008L15.558 2.7502H21C21.4142 2.7502 21.75 2.41441 21.75 2.0002C21.75 1.58598 21.4142 1.2502 21 1.2502H15.0169C15.0054 1.24993 14.994 1.24993 14.9826 1.2502Z" fill="currentColor"/>
</svg>
`,
};
const TextItalic = ({ size = 24, color = "currentColor", weight = "outline", className = "", style = {}, ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    const svgProps = { viewBox: "0 0 24 24", width: size, height: size, fill: "currentColor", stroke: "currentColor", className, style: { color, ...style }, ...props };
    return react_1.default.createElement("svg", svgProps, react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } }));
};
exports.TextItalic = TextItalic;
