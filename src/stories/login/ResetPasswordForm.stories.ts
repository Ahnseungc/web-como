import type { Meta, StoryObj } from "@storybook/react";
import ResetPasswordForm from "@/components/login/organisms/ResetPasswordForm";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Login/ResetPasswordForm",
  component: ResetPasswordForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {
  args: {},
};
