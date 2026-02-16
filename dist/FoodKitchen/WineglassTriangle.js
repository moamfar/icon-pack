"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WineglassTriangle = void 0;
const react_1 = __importDefault(require("react"));
const svgs = {
  "broken": `
<path d="M12 14.5714L20.5162 5.86382C21.5624 4.79409 20.7999 3 19.2991 3H14M12 14.5714L3.48381 5.86382C2.43759 4.79409 3.20008 3 4.70095 3H10M12 14.5714V21M12 21H16.2439M12 21H7.7561M7.47318 9.75H16.5268" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`,
  "duotone": `
<path opacity="0.5" d="M19.2991 3H4.70095C3.20008 3 2.43759 4.79409 3.48381 5.86382L11.2851 13.8404C11.6773 14.2415 12.3227 14.2415 12.7149 13.8404L20.5162 5.86382C21.5624 4.79409 20.7999 3 19.2991 3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00586 21C7.00586 20.5858 7.34165 20.25 7.75586 20.25H16.2437C16.6579 20.25 16.9937 20.5858 16.9937 21C16.9937 21.4142 16.6579 21.75 16.2437 21.75H7.75586C7.34165 21.75 7.00586 21.4142 7.00586 21Z" fill="currentColor"/>
<path d="M11.2853 13.8404C11.6776 14.2415 12.3229 14.2415 12.7152 13.8404L16.4712 10H7.5293L11.2853 13.8404Z" fill="currentColor"/>
<path opacity="0.5" d="M11.2853 13.8408C11.6776 14.2419 12.3229 14.2419 12.7152 13.8408L12.75 13.8052V20.2502H11.25V13.8047L11.2853 13.8408Z" fill="currentColor"/>
</svg>
`,
  "fill": `
<path d="M19.2991 3H4.70095C3.20008 3 2.43759 4.79409 3.48381 5.86382L6.23508 9H17.7649L20.5162 5.86382C21.5624 4.79409 20.7999 3 19.2991 3Z" fill="currentColor"/>
<path d="M16.449 10.5H7.55099L11.2498 14.7162V20.2499H7.75586C7.34165 20.2499 7.00586 20.5856 7.00586 20.9999C7.00586 21.4141 7.34165 21.7499 7.75586 21.7499H16.2437C16.6579 21.7499 16.9937 21.4141 16.9937 20.9999C16.9937 20.5856 16.6579 20.2499 16.2437 20.2499H12.7498V14.7168L16.449 10.5Z" fill="currentColor"/>
</svg>
`,
  "outline": `
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.94714 6.38823C1.43001 4.837 2.54477 2.25 4.70047 2.25H19.2986C21.4543 2.25 22.569 4.83699 21.0519 6.38822L12.7495 14.8772V20.25H16.2434C16.6576 20.25 16.9934 20.5858 16.9934 21C16.9934 21.4142 16.6576 21.75 16.2434 21.75H7.75562C7.34141 21.75 7.00562 21.4142 7.00562 21C7.00562 20.5858 7.34141 20.25 7.75562 20.25H11.2495V14.8772L2.94714 6.38823ZM11.9995 13.4988L14.9324 10.5H9.06666L11.9995 13.4988ZM7.59963 9H16.3994L19.9795 5.33942C20.5548 4.75118 20.1446 3.75 19.2986 3.75H4.70047C3.85443 3.75 3.44421 4.75118 4.01952 5.33942L7.59963 9Z" fill="currentColor"/>
</svg>
`,
};
const WineglassTriangle = ({ size = 24, color = "currentColor", weight = "outline", ...props }) => {
    const activeWeight = Object.keys(svgs).includes(weight) ? weight : Object.keys(svgs)[0];
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
exports.WineglassTriangle = WineglassTriangle;
