import type { SVGAttributes } from "react";

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: number;
  color?: string;
  weight?: "outline" | "bold";
}
