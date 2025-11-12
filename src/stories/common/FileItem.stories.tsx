import type { Meta, StoryObj } from "@storybook/react";
import FileItem from "@/components/common/FileItem";

const meta: Meta<typeof FileItem> = {
  title: "Common/FileItem",
  component: FileItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileItem>;

export const Default: Story = {
  args: {},
};
