import * as React from "react";
import { DivederProps } from "./types";
import { vars } from "@dev-traveler/themes";

const Divider = (props: DivederProps, ref: React.Ref<HTMLHRElement>) => {
  const {
    orientation = "horizontal",
    color = "gray",
    size = 1,
    variant = "solid",
  } = props;

  const borderStyle =
    orientation === "horizontal"
      ? {
          width: "100%",
          borderWidth: `0 0 ${size}px 0`,
        }
      : {
          height: "100%",
          borderWidth: `0 0 0 ${size}px`,
        };

  return (
    <hr
      {...props}
      ref={ref}
      style={{
        borderStyle: variant,
        borderColor: vars.colors.$scale?.[color]?.[200] ?? color,
        ...borderStyle,
        ...props.style,
      }}
    />
  );
};

const _Divider = React.forwardRef(Divider);
export { _Divider as Divider };
