import React from "react";
import "@dev-traveler/react-components-layout/styles.css";
import { Flex as _Flex } from "@dev-traveler/react-components-layout";

export default {
  title: "React Components/Layout/Flex ",
  component: _Flex,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const FlexStory = {
  args: {
    as: "div",
    padding: "5",
    background: "pink",
    boxShadow: "xl",
    borderRadius: "md",
    justify: "space-between",
    style: { width: "300px" },
  },
  render: (props) => (
    <_Flex {...props}>
      <div>Flex</div>
      <div>Test</div>
    </_Flex>
  ),
};
