import type { SVGAttributes } from "react";
export interface IconProps extends SVGAttributes<SVGElement> {
    size?: number;
    color?: string;
    weight?: "bold" | "boldduotone" | "broken" | "lineduotone" | "linear" | "outline";
}
