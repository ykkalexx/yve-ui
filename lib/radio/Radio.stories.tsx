import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  argTypes: {
    labelPosition: {
      control: "select",
      options: ["left", "right"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Option 1",
    disabled: false,
    labelPosition: "right",
  },
};

export const Disabled: Story = {
  args: {
    label: "Option 1",
    disabled: true,
    labelPosition: "left",
  },
};
