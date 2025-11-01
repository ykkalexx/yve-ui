import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "./Button";

// using AI to generate simmple SVG icons for storybook
// yeah i could import an icon but this is faster at the moment and is just for demo purposes in storybook

const SpinnerIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

const CheckIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

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
    startIcon: SpinnerIcon,
    endIcon: CheckIcon,
    children: "Processing",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
