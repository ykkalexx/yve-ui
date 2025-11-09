import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "./Button";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Click me",
    intent: "primary",
    size: "md",
    shape: "pill",
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    intent: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "danger", "outline", "subtle"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["xs", "sm", "md", "lg"],
    },
    shape: {
      control: { type: "inline-radio" },
      options: ["rounded", "pill", "square"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { intent: "secondary" },
};

export const Ghost: Story = {
  args: { intent: "ghost" },
};

export const Danger: Story = {
  args: { intent: "danger", children: "Delete" },
};

export const Outline: Story = {
  args: { intent: "outline" },
};

export const Subtle: Story = {
  args: { intent: "subtle" },
};

export const Sizes: Story = {
  render: (args: ButtonProps) => (
    <div className="flex gap-3 items-center">
      <Button {...args} size="xs">
        XS
      </Button>
      <Button {...args} size="sm">
        SM
      </Button>
      <Button {...args} size="md">
        MD
      </Button>
      <Button {...args} size="lg">
        LG
      </Button>
    </div>
  ),
  args: { intent: "primary" },
};

export const WithIcons: Story = {
  args: {
    startIcon: <IconLoader2 stroke={1.5} />,
    endIcon: <IconCheck stroke={1.5} />,
    children: "Processing",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
