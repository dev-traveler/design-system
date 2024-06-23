import { vars } from "@dev-traveler/themes";
import { AsElementProps, StyleProps } from "../core/types";

export type BoxProps = AsElementProps & StyleProps;

export type DivederProps = {
  orientation?: "horizontal" | "vertical";
  color?: keyof typeof vars.colors.$scale;
  size?: number;
  variant?: "solid" | "dashed";
} & React.HTMLAttributes<HTMLHRElement>;
