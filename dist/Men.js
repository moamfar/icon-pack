"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Men = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M6 7.07026C7.17669 6.38958 8.54285 6 10 6C14.4183 6 18 9.58172 18 14C18 18.4183 14.4183 22 10 22C5.58172 22 2 18.4183 2 14C2 12.5429 2.38958 11.1767 3.07026 10" stroke-width="1.5" stroke-linecap="round"/>
<path d="M22 2H22.75C22.75 1.58579 22.4142 1.25 22 1.25V2ZM21.25 7C21.25 7.41421 21.5858 7.75 22 7.75C22.4142 7.75 22.75 7.41421 22.75 7H21.25ZM17 1.25C16.5858 1.25 16.25 1.58579 16.25 2C16.25 2.41421 16.5858 2.75 17 2.75V1.25ZM16.0303 9.03033L22.5303 2.53033L21.4697 1.46967L14.9697 7.96967L16.0303 9.03033ZM21.25 2V7H22.75V2H21.25ZM17 2.75H22V1.25H17V2.75Z"/>
</svg>
`,
  "fill": `
<path d="M17.0001 1.25C16.5858 1.25 16.2501 1.58579 16.2501 2C16.2501 2.41421 16.5858 2.75 17.0001 2.75H20.1894L15.1018 7.8376C13.717 6.68989 11.9391 6 10 6C5.58172 6 2 9.58172 2 14C2 18.4183 5.58172 22 10 22C14.4183 22 18 18.4183 18 14C18 12.0609 17.3101 10.283 16.1624 8.89827L21.2501 3.81066V7C21.2501 7.41421 21.5858 7.75 22.0001 7.75C22.4143 7.75 22.7501 7.41421 22.7501 7V2C22.7501 1.58579 22.4143 1.25 22.0001 1.25H17.0001Z"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.25 2C16.25 1.58579 16.5858 1.25 17 1.25H22C22.4142 1.25 22.75 1.58579 22.75 2V7C22.75 7.41421 22.4142 7.75 22 7.75C21.5858 7.75 21.25 7.41421 21.25 7V3.81066L16.6949 8.36578C17.9773 9.88802 18.75 11.8538 18.75 14C18.75 18.8325 14.8325 22.75 10 22.75C5.16751 22.75 1.25 18.8325 1.25 14C1.25 9.16751 5.16751 5.25 10 5.25C12.1462 5.25 14.112 6.02271 15.6342 7.30512L20.1893 2.75H17C16.5858 2.75 16.25 2.41421 16.25 2ZM10 6.75C5.99594 6.75 2.75 9.99594 2.75 14C2.75 18.0041 5.99594 21.25 10 21.25C14.0041 21.25 17.25 18.0041 17.25 14C17.25 9.99594 14.0041 6.75 10 6.75Z"/>
</svg>
`,
};
const Men = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    return (react_1.default.createElement("svg", Object.assign({ viewBox: "0 0 24 24", width: size, height: size, fill: color }, props),
        react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } })));
};
exports.Men = Men;
