"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkBrokenMinimalistic = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M10 5.04877L10.367 4.70563C12.7995 2.43146 16.7432 2.43146 19.1757 4.70563M16.9735 15L19.1757 12.9411C20.3438 11.849 20.951 10.4309 20.9972 9" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 18.9278L13.6345 19.2773C11.2123 21.5937 7.25434 21.5644 4.83209 19.248C2.43376 16.9546 2.37639 13.2153 4.74095 10.89L5.64594 10" stroke-width="1.5" stroke-linecap="round"/>
<path d="M6.5869 3L7.49951 5.20521" stroke-width="1.5" stroke-linecap="round"/>
<path d="M3.50189 6.08682L9.04972 8.79477" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "fill": `
<path d="M10 5.04877L10.367 4.70563C12.7995 2.43146 16.7432 2.43146 19.1757 4.70563C21.6081 6.9798 21.6081 10.667 19.1757 12.9411L16.9735 15" stroke-width="1.5" stroke-linecap="round"/>
<path d="M14 18.9278L13.6345 19.2773C11.2123 21.5937 7.25434 21.5644 4.83209 19.248C2.43376 16.9546 2.37639 13.2153 4.74095 10.89L5.64594 10" stroke-width="1.5" stroke-linecap="round"/>
<path d="M6.5869 3L7.49951 5.20521" stroke-width="1.5" stroke-linecap="round"/>
<path d="M3.50189 6.08682L9.04972 8.79477" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "outline": `
<path d="M6.30061 2.3072C6.68334 2.1488 7.12201 2.33067 7.2804 2.7134L8.19302 4.91861C8.35141 5.30134 8.16954 5.74001 7.78681 5.8984C7.40408 6.0568 6.96541 5.87493 6.80702 5.4922L5.8944 3.28699C5.73601 2.90426 5.91787 2.46559 6.30061 2.3072Z"/>
<path d="M19.6879 4.15797C16.9672 1.61427 12.5756 1.61427 9.85484 4.15797L9.48781 4.50112C9.18524 4.784 9.16928 5.25861 9.45216 5.56118C9.73505 5.86375 10.2097 5.87971 10.5122 5.59682L10.8792 5.25368C13.0234 3.24904 16.5193 3.24904 18.6635 5.25368C20.7789 7.23142 20.7789 10.4157 18.6635 12.3935L16.4613 14.4523C16.1587 14.7352 16.1428 15.2098 16.4257 15.5124C16.7086 15.815 17.1832 15.8309 17.4857 15.5481L19.6879 13.4892C22.4374 10.9186 22.4374 6.72857 19.6879 4.15797Z"/>
<path d="M6.17183 10.5349C6.46716 10.2445 6.47114 9.76966 6.18071 9.47432C5.89027 9.17899 5.41542 9.17501 5.12008 9.46545L4.21509 10.3554C1.54336 12.9828 1.61504 17.2095 4.31376 19.7903C7.02135 22.3795 11.4361 22.4176 14.1529 19.8196L14.5184 19.4701C14.8177 19.1838 14.8283 18.709 14.5421 18.4097C14.2558 18.1103 13.781 18.0997 13.4817 18.386L13.1162 18.7355C10.9885 20.7702 7.48737 20.7496 5.35045 18.7062C3.25251 16.7 3.20945 13.4482 5.26684 11.4249L6.17183 10.5349Z"/>
<path d="M3.83138 5.41278C3.45914 5.23109 3.01009 5.38556 2.8284 5.75779C2.64671 6.13003 2.80117 6.57908 3.17341 6.76077L8.72125 9.46872C9.09348 9.65041 9.54253 9.49595 9.72422 9.12371C9.90592 8.75147 9.75145 8.30242 9.37921 8.12073L3.83138 5.41278Z"/>
</svg>
`,
};
const LinkBrokenMinimalistic = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    return (react_1.default.createElement("svg", Object.assign({ viewBox: "0 0 24 24", width: size, height: size, fill: color }, props),
        react_1.default.createElement("g", { dangerouslySetInnerHTML: { __html: svgs[activeWeight] } })));
};
exports.LinkBrokenMinimalistic = LinkBrokenMinimalistic;
