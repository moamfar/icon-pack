import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  weight?: "fill" | "broken" | "outline" | "duotone";
}
