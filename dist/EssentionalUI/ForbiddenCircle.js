"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenCircle = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M18.5 5.5L5.50002 18.4998" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "duotone": `
<path opacity="0.5" d="M4.92893 4.92893C1.02369 8.83418 1.02369 15.1658 4.92893 19.0711C8.83418 22.9763 15.1656 22.9761 19.0708 19.0708C22.9761 15.1656 22.9763 8.83418 19.0711 4.92893C15.1658 1.02369 8.83418 1.02369 4.92893 4.92893Z" fill="currentColor"/>
<path d="M18.5211 4.41833L4.41797 18.5212C4.58006 18.7092 4.75031 18.8927 4.9287 19.0711C5.1071 19.2495 5.29057 19.4197 5.47863 19.5818L19.5817 5.47901C19.4196 5.29091 19.2493 5.1074 19.0708 4.92896C18.8925 4.75061 18.7091 4.5804 18.5211 4.41833Z" fill="currentColor"/>
</svg>
`,
  "fill": `
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 9.50853 21.0889 7.22987 19.5816 5.47906L5.47905 19.5816C7.22987 21.0889 9.50853 22 12 22Z" fill="currentColor"/>
<path d="M12 2C6.47715 2 2 6.47715 2 12C2 14.4915 2.91114 16.7701 4.41839 18.5209L18.5209 4.41839C16.7701 2.91114 14.4915 2 12 2Z" fill="currentColor"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C14.2845 2.75 16.3756 3.57817 17.9894 4.95066C17.9827 4.95685 17.9762 4.96319 17.9697 4.96967L4.96969 17.9694C4.96317 17.976 4.95679 17.9826 4.95056 17.9893C3.57813 16.3755 2.75 14.2845 2.75 12ZM6.0105 19.0492C7.62432 20.4218 9.71544 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 9.7155 20.4218 7.62442 19.0493 6.01062C19.0431 6.01728 19.0368 6.02386 19.0303 6.03034L6.03034 19.0301C6.02382 19.0366 6.0172 19.043 6.0105 19.0492Z" fill="currentColor"/>
</svg>
`,
};
const ForbiddenCircle = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
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
exports.ForbiddenCircle = ForbiddenCircle;
