import type { Meta, StoryObj } from "@storybook/react";
import CustomSkeleton from "@/components/common/CustomSkeleton";

const meta: Meta<typeof CustomSkeleton> = {
  title: "Common/CustomSkeleton",
  component: CustomSkeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomSkeleton>;

export const Default: Story = {
  args: {},
};

export const CustomSize: Story = {
  args: {
    className: "w-32 h-32",
  },
};

export const Rectangular: Story = {
  args: {
    className: "w-64 h-32",
  },
};
