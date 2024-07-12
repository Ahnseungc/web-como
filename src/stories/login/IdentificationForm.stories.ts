import type { Meta, StoryObj } from "@storybook/react";
import IdentificationForm from "@/components/login/organisms/IdentificationForm";

const meta: Meta<typeof IdentificationForm> = {
  title: "Login/IdentificationForm",
  component: IdentificationForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IdentificationForm>;

export const Default: Story = {
  args: {},
};
