import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    shape: {
      control: "select",
      options: ["pill", "rounded", "square"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
    },
    checked: {
      control: "boolean",
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
    label: "Accept terms and conditions",
    checked: false,
    shape: "pill",
    size: "sm",
    disabled: false,
    labelPosition: "right",
  },
};

export const Checked: Story = {
  args: {
    label: "I agree",
    checked: true,
    shape: "pill",
    size: "sm",
    labelPosition: "right",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    checked: false,
    disabled: true,
    shape: "pill",
    size: "sm",
    labelPosition: "right",
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    checked: true,
    disabled: true,
    shape: "pill",
    size: "sm",
    labelPosition: "right",
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
    shape: "pill",
    size: "sm",
  },
};

export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Label on the right" labelPosition="right" checked />
      <Checkbox label="Label on the left" labelPosition="left" checked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Extra Small" size="xs" />
      <Checkbox label="Small" size="sm" />
      <Checkbox label="Medium" size="md" />
      <Checkbox label="Large" size="lg" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Pill" shape="pill" checked />
      <Checkbox label="Rounded" shape="rounded" checked />
      <Checkbox label="Square" shape="square" checked />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium mb-3 text-[#AFAFAF]">Unchecked</h3>
        <div className="flex gap-4">
          <Checkbox label="Pill" shape="pill" />
          <Checkbox label="Rounded" shape="rounded" />
          <Checkbox label="Square" shape="square" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3 text-[#AFAFAF]">Checked</h3>
        <div className="flex gap-4">
          <Checkbox label="Pill" shape="pill" checked />
          <Checkbox label="Rounded" shape="rounded" checked />
          <Checkbox label="Square" shape="square" checked />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3 text-[#AFAFAF]">Disabled</h3>
        <div className="flex gap-4">
          <Checkbox label="Unchecked" disabled />
          <Checkbox label="Checked" checked disabled />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3 text-[#AFAFAF]">Label Positions</h3>
        <div className="flex gap-4">
          <Checkbox label="Right" labelPosition="right" checked />
          <Checkbox label="Left" labelPosition="left" checked />
        </div>
      </div>
    </div>
  ),
};
