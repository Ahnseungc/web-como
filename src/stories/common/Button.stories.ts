import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/common/Button";

const CONTENT = "버튼";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { content: CONTENT, primary: true },
};

export const Secondary: Story = {
  args: { content: CONTENT, primary: false },
};
