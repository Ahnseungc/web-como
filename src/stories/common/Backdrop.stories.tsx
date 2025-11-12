import type { Meta, StoryObj } from "@storybook/react";
import Backdrop from "@/components/common/Backdrop";

const meta: Meta<typeof Backdrop> = {
  title: "Common/Backdrop",
  component: Backdrop,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

export const Default: Story = {
  args: {},
};

export const Invisible: Story = {
  args: {
    invisible: true,
  },
};

export const WithHandleClose: Story = {
  args: {
    handleClose: () => console.log("Backdrop clicked"),
  },
};
