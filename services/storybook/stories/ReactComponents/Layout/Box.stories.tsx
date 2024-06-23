import "@dev-traveler/react-components-layout/styles.css";
import { Box as _Box } from "@dev-traveler/react-components-layout";

export default {
  title: "React Components/Layout/Box ",
  component: _Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const BoxStory = {
  args: {
    as: "button",
    padding: "5",
    background: "blue",
    boxShadow: "2xl",
    borderRadius: "md",
  },
};
