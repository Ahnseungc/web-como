import type { Meta, StoryObj } from "@storybook/react";
import LoginHeader from "@/components/header/LoginHeader";

const meta: Meta<typeof LoginHeader> = {
  title: "Header/LoginHeader",
  component: LoginHeader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginHeader>;

export const Default: Story = {
  args: {},
};
