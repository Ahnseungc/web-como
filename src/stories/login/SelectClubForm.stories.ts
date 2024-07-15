import type { Meta, StoryObj } from "@storybook/react";
import SelectClubForm from "@/components/login/organisms/SelectClubForm";

const meta: Meta<typeof SelectClubForm> = {
  title: "Login/SelectClubForm",
  component: SelectClubForm,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectClubForm>;

export const Default: Story = {
  args: {},
};
