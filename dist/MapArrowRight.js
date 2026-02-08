"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapArrowRight = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M14 16.5974L21.0072 13.4725C22.3309 12.8822 22.3309 11.1178 21.0072 10.5275L4.49746 3.16496C3.00163 2.49789 1.45007 3.97914 2.19099 5.36689L5.34302 11.2706C5.58818 11.7298 5.58817 12.2702 5.34302 12.7294L2.19099 18.6331C1.45006 20.0209 3.00163 21.5021 4.49746 20.835L9.24873 18.7162" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "fill": `
<path d="M4.49746 20.835L21.0072 13.4725C22.3309 12.8822 22.3309 11.1178 21.0072 10.5275L4.49746 3.16496C3.00163 2.49789 1.45006 3.97914 2.19099 5.36689L5.34302 11.2706C5.58817 11.7298 5.58818 12.2702 5.34302 12.7294L2.19099 18.6331C1.45007 20.0209 3.00163 21.5021 4.49746 20.835Z"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.98744 2.95325C2.67201 2.29971 3.75513 2.01313 4.80282 2.48035L21.3125 9.84285C23.229 10.6975 23.229 13.3032 21.3125 14.1579L4.80282 21.5204C3.75513 21.9876 2.67201 21.701 1.98744 21.0475C1.2971 20.3884 0.978305 19.3122 1.52928 18.2802L4.68131 12.3765L5.34291 12.7298L4.68131 12.3765C4.8086 12.1381 4.8086 11.8626 4.68131 11.6242L1.52928 5.72049C0.978304 4.68853 1.2971 3.6123 1.98744 2.95325ZM3.02323 4.03821C2.74905 4.29996 2.66253 4.65823 2.85249 5.01402L2.19088 5.36725L2.85249 5.01402L6.00452 10.9177C6.36753 11.5976 6.36753 12.4031 6.00452 13.083L2.85249 18.9867C2.66253 19.3425 2.74905 19.7008 3.02323 19.9625C3.30317 20.2298 3.74374 20.3503 4.19189 20.1504L20.7016 12.7879C21.4326 12.4619 21.4327 11.5388 20.7016 11.2128L4.19189 3.8503C3.74374 3.65045 3.30317 3.77096 3.02323 4.03821Z"/>
</svg>
`,
};
const MapArrowRight = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    return (react_1.default.createElement("svg", Object.assign({ viewBox: "0 0 24 24", width: size, height: size, fill: color }, props),
        react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } })));
};
exports.MapArrowRight = MapArrowRight;
