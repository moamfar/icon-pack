"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderEssentionalUI = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M19 10L11 10M5 10H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 18H13M19 18H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19 14L5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19 6L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "duotone": `
<path opacity="0.5" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" fill="currentColor"/>
<path d="M19.75 10C19.75 10.4142 19.4142 10.75 19 10.75H5C4.58579 10.75 4.25 10.4142 4.25 10C4.25 9.58579 4.58579 9.25 5 9.25H19C19.4142 9.25 19.75 9.58579 19.75 10Z" fill="currentColor"/>
<path d="M19.75 14C19.75 14.4142 19.4142 14.75 19 14.75H5C4.58579 14.75 4.25 14.4142 4.25 14C4.25 13.5858 4.58579 13.25 5 13.25H19C19.4142 13.25 19.75 13.5858 19.75 14Z" fill="currentColor"/>
<path d="M19.75 6C19.75 6.41421 19.4142 6.75 19 6.75H5C4.58579 6.75 4.25 6.41421 4.25 6C4.25 5.58579 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 5.58579 19.75 6Z" fill="currentColor"/>
<path d="M19.75 18C19.75 18.4142 19.4142 18.75 19 18.75H5C4.58579 18.75 4.25 18.4142 4.25 18C4.25 17.5858 4.58579 17.25 5 17.25H19C19.4142 17.25 19.75 17.5858 19.75 18Z" fill="currentColor"/>
</svg>
`,
  "fill": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM19 18.75C19.4142 18.75 19.75 18.4142 19.75 18C19.75 17.5858 19.4142 17.25 19 17.25H5C4.58579 17.25 4.25 17.5858 4.25 18C4.25 18.4142 4.58579 18.75 5 18.75H19ZM19.75 14C19.75 14.4142 19.4142 14.75 19 14.75H5C4.58579 14.75 4.25 14.4142 4.25 14C4.25 13.5858 4.58579 13.25 5 13.25H19C19.4142 13.25 19.75 13.5858 19.75 14ZM19 10.75C19.4142 10.75 19.75 10.4142 19.75 10C19.75 9.58579 19.4142 9.25 19 9.25H5C4.58579 9.25 4.25 9.58579 4.25 10C4.25 10.4142 4.58579 10.75 5 10.75H19ZM19.75 6C19.75 6.41421 19.4142 6.75 19 6.75H5C4.58579 6.75 4.25 6.41421 4.25 6C4.25 5.58579 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 5.58579 19.75 6Z" fill="currentColor"/>
</svg>
`,
  "lineduotone": `
<path d="M19 10L5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path opacity="0.5" d="M19 14L5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path opacity="0.5" d="M19 6L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19 18L5 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 10C19.75 10.4142 19.4142 10.75 19 10.75L5 10.75C4.58579 10.75 4.25 10.4142 4.25 10C4.25 9.58579 4.58579 9.25 5 9.25L19 9.25C19.4142 9.25 19.75 9.58579 19.75 10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 14C19.75 14.4142 19.4142 14.75 19 14.75L5 14.75C4.58579 14.75 4.25 14.4142 4.25 14C4.25 13.5858 4.58579 13.25 5 13.25L19 13.25C19.4142 13.25 19.75 13.5858 19.75 14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 6C19.75 6.41421 19.4142 6.75 19 6.75L5 6.75C4.58579 6.75 4.25 6.41421 4.25 6C4.25 5.58579 4.58579 5.25 5 5.25L19 5.25C19.4142 5.25 19.75 5.58579 19.75 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 18C19.75 18.4142 19.4142 18.75 19 18.75L5 18.75C4.58579 18.75 4.25 18.4142 4.25 18C4.25 17.5858 4.58579 17.25 5 17.25L19 17.25C19.4142 17.25 19.75 17.5858 19.75 18Z" fill="currentColor"/>
</svg>
`,
};
const ReorderEssentionalUI = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
    return (
        react_1.default.createElement(
            "svg",
            Object.assign(
                { viewBox: "0 0 24 24", width: size, height: size, color: color },
                props
            ),
            react_1.default.createElement("g", {
                dangerouslySetInnerHTML: { __html: svgs[activeWeight] }
            })
        )
    );
};
exports.ReorderEssentionalUI = ReorderEssentionalUI;
