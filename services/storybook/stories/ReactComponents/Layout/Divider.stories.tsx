import React from "react";
import "@dev-traveler/react-components-layout/styles.css";
import { vars } from "@dev-traveler/themes";
import {
  Box,
  Divider as _Divider,
} from "@dev-traveler/react-components-layout";

export default {
  title: "React Components/Layout/Divider ",
  component: _Divider,
  decorators: [
    (Story) => (
      <Box padding={3} style={{ width: "300px", height: "300px" }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
    variant: {
      options: ["solid", "dashed"],
      control: { type: "select" },
    },
    color: {
      options: Object.keys(vars.colors.$scale),
      control: { type: "select" },
    },
  },
};

export const DividerStory = {
  args: {
    color: "gray",
    size: 1,
    variant: "solid",
    orientation: "horizontal",
  },
};
