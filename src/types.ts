import type { SVGAttributes } from "react";

// We use a string type here because weights are dynamic based on folder names
export interface IconProps extends SVGAttributes<SVGElement> {
  size?: number;
  color?: string;
  weight?: "bold" | "boldduotone" | "broken" | "lineduotone" | "linear" | "outline";
}
