import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "@/components/common/Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Common/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {},
};

export const CustomSize: Story = {
  args: {
    size: "w-32 h-16",
  },
};

export const Big: Story = {
  args: {
    size: "w-64 h-32",
    big: true,
  },
};

export const Small: Story = {
  args: {
    size: "w-24 h-8",
  },
};
