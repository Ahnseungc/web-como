import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/common/Input";

const meta: Meta<typeof Input> = {
  title: "Common/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { name: "input", type: "text", placeholder: "텍스트를 작성해보세요!" },
};
