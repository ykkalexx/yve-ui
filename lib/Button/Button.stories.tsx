import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Click me",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Click me",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Delete",
    variant: "danger",
  },
};
