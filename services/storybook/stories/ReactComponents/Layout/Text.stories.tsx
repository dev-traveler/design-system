import "@dev-traveler/react-components-layout/styles.css";
import { classes, vars } from "@dev-traveler/themes";
import { Text as _Text } from "@dev-traveler/react-components-layout";

export default {
  title: "React Components/Layout/Text ",
  component: _Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      options: ["p", "span", "div", "b", "i", "u", "strong", "em"],
      control: { type: "select" },
    },
    fontSize: {
      options: Object.keys(classes.typography.text),
      control: { type: "select" },
    },
    color: {
      options: Object.keys(vars.colors.$scale),
      control: { type: "select" },
    },
  },
};

export const TextStory = {
  args: {
    as: "p",
    fontSize: "xl",
    children: "Hello, World",
    color: "gray",
  },
};
