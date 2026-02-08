"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapArrowLeft = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M10 7.40261L2.99281 10.5275C1.66906 11.1178 1.66906 12.8822 2.99281 13.4725L19.5025 20.835C20.9984 21.5021 22.5499 20.0209 21.809 18.6331L18.657 12.7294C18.4118 12.2702 18.4118 11.7298 18.657 11.2706L21.809 5.36689C22.5499 3.97914 20.9984 2.49789 19.5025 3.16496L14.7513 5.28379" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "fill": `
<path d="M19.5025 20.835L2.99281 13.4725C1.66906 12.8822 1.66906 11.1178 2.99281 10.5275L19.5025 3.16496C20.9984 2.49789 22.5499 3.97914 21.809 5.36689L18.657 11.2706C18.4118 11.7298 18.4118 12.2702 18.657 12.7294L21.809 18.6331C22.5499 20.0209 20.9984 21.5021 19.5025 20.835Z"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0126 2.95325C21.328 2.29971 20.2449 2.01313 19.1972 2.48035L2.68746 9.84285C0.770992 10.6975 0.770992 13.3032 2.68746 14.1579L19.1972 21.5204C20.2449 21.9876 21.328 21.701 22.0126 21.0475C22.7029 20.3884 23.0217 19.3122 22.4707 18.2802L19.3187 12.3765L18.6571 12.7298L19.3187 12.3765C19.1914 12.1381 19.1914 11.8626 19.3187 11.6242L22.4707 5.72049C23.0217 4.68853 22.7029 3.6123 22.0126 2.95325ZM20.9768 4.03821C21.2509 4.29996 21.3375 4.65823 21.1475 5.01402L21.8091 5.36725L21.1475 5.01402L17.9955 10.9177C17.6325 11.5976 17.6325 12.4031 17.9955 13.083L21.1475 18.9867C21.3375 19.3425 21.2509 19.7008 20.9768 19.9625C20.6968 20.2298 20.2563 20.3503 19.8081 20.1504L3.29838 12.7879C2.56735 12.4619 2.56735 11.5388 3.29838 11.2128L19.8081 3.8503C20.2563 3.65045 20.6968 3.77096 20.9768 4.03821Z"/>
</svg>
`,
};
const MapArrowLeft = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    return (react_1.default.createElement("svg", Object.assign({ viewBox: "0 0 24 24", width: size, height: size, fill: color }, props),
        react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } })));
};
exports.MapArrowLeft = MapArrowLeft;
