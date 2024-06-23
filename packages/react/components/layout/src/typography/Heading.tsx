import * as React from "react";
import { clsx } from "clsx";
import { vars } from "@dev-traveler/themes";
import { HeadingProps } from "./types";
import { StyleSprinkles } from "../core/style.css";
import { extractSprinkleProps } from "../utils/properties";
import { headingStyle } from "./style.css";

const Heading = (props: HeadingProps, ref: React.Ref<HTMLElement>) => {
  const { as = "h4", color = "gray", background, fontSize, children } = props;

  return React.createElement(
    as,
    {
      ...props,
      ref,
      className: clsx([
        StyleSprinkles(
          extractSprinkleProps(props, Array.from(StyleSprinkles.properties)),
        ),
        headingStyle({
          fontSize,
        }),
        props.className,
      ]),
      style: {
        color: vars.colors.$scale?.[color]?.[700] ?? color,
        background: vars.colors.$scale?.[background]?.[100] ?? background,
        ...props.style,
      },
    },
    children,
  );
};

const _Heading = React.forwardRef(Heading);
export { _Heading as Heading };
