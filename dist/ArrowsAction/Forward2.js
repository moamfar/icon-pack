"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forward2 = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M19.5 12L14.5 17M19.5 12L14.5 7M19.5 12L13 12M9.5 12C7.83333 12 4.5 11 4.5 7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  "fill": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 6.25C4.91421 6.25 5.25 6.58579 5.25 7C5.25 8.75556 5.96468 9.7804 6.81323 10.3913C7.70002 11.0298 8.78668 11.25 9.5 11.25L17.6893 11.25L13.9697 7.53033C13.6768 7.23744 13.6768 6.76256 13.9697 6.46967C14.2626 6.17678 14.7374 6.17678 15.0303 6.46967L20.0303 11.4697C20.3232 11.7626 20.3232 12.2374 20.0303 12.5303L15.0303 17.5303C14.7374 17.8232 14.2626 17.8232 13.9697 17.5303C13.6768 17.2374 13.6768 16.7626 13.9697 16.4697L17.6893 12.75L9.5 12.75C8.54665 12.75 7.13332 12.4702 5.93677 11.6087C4.70198 10.7196 3.75 9.24444 3.75 7C3.75 6.58579 4.08579 6.25 4.5 6.25Z"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 6.25C4.91421 6.25 5.25 6.58579 5.25 7C5.25 8.75556 5.96468 9.7804 6.81323 10.3913C7.70002 11.0298 8.78668 11.25 9.5 11.25L17.6893 11.25L13.9697 7.53033C13.6768 7.23744 13.6768 6.76256 13.9697 6.46967C14.2626 6.17678 14.7374 6.17678 15.0303 6.46967L20.0303 11.4697C20.3232 11.7626 20.3232 12.2374 20.0303 12.5303L15.0303 17.5303C14.7374 17.8232 14.2626 17.8232 13.9697 17.5303C13.6768 17.2374 13.6768 16.7626 13.9697 16.4697L17.6893 12.75L9.5 12.75C8.54665 12.75 7.13332 12.4702 5.93677 11.6087C4.70198 10.7196 3.75 9.24444 3.75 7C3.75 6.58579 4.08579 6.25 4.5 6.25Z"/>
</svg>
`,
};
const Forward2 = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    return (react_1.default.createElement("svg", Object.assign({ viewBox: "0 0 24 24", width: size, height: size, fill: color }, props),
        react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } })));
};
exports.Forward2 = Forward2;
