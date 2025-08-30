declare module "@phosphor-icons/react" {
  import { ComponentType, SVGProps } from "react";

  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
    alt?: string;
    mirrored?: boolean;
  }

  type IconComponent = ComponentType<IconProps>;

  export const List: IconComponent;
  export const MagnifyingGlass: IconComponent;
  export const Check: IconComponent;
  // Add other icons as needed
}
