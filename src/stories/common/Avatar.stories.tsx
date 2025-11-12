import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "@/components/common/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Common/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: "w-8 h-8",
  },
};

export const Large: Story = {
  args: {
    size: "w-16 h-16",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://via.placeholder.com/64",
    size: "w-12 h-12",
  },
};
