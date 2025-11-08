import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { IconSearch, IconMail, IconLock, IconUser } from "@tabler/icons-react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    type: "text",
    placeholder: "Type here...",
    disabled: false,
    fullWidth: false,
    shape: "pill",
    size: "md",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
    shape: {
      control: { type: "inline-radio" },
      options: ["rounded", "pill", "square"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["xs", "sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
};

export const WithStartIcon: Story = {
  args: {
    startIcon: <IconSearch stroke={1.5} />,
    placeholder: "Search...",
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <IconMail stroke={1.5} />,
    placeholder: "Enter email...",
    type: "email",
  },
};

export const WithBothIcons: Story = {
  args: {
    startIcon: <IconUser stroke={1.5} />,
    endIcon: <IconLock stroke={1.5} />,
    placeholder: "Username",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: "Full width input",
    fullWidth: true,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
    startIcon: <IconLock stroke={1.5} />,
    label: "Password",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "you@example.com",
    startIcon: <IconMail stroke={1.5} />,
    label: "Email",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter amount",
    label: "Amount",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="xs" placeholder="Extra small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input shape="square" placeholder="Square shape" />
      <Input shape="rounded" placeholder="Rounded shape" />
      <Input shape="pill" placeholder="Pill shape" />
    </div>
  ),
};

export const AllSizesWithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="xs" startIcon={<IconSearch stroke={1.5} />} placeholder="Extra small with icon" />
      <Input size="sm" startIcon={<IconSearch stroke={1.5} />} placeholder="Small with icon" />
      <Input size="md" startIcon={<IconSearch stroke={1.5} />} placeholder="Medium with icon" />
      <Input size="lg" startIcon={<IconSearch stroke={1.5} />} placeholder="Large with icon" />
    </div>
  ),
};
