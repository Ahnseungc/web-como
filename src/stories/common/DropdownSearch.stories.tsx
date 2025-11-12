import type { Meta, StoryObj } from "@storybook/react";
import DropdownSearch from "@/components/common/DropdownSearch";

const meta: Meta<typeof DropdownSearch> = {
  title: "Common/DropdownSearch",
  component: DropdownSearch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownSearch>;

export const Default: Story = {
  args: {
    baseStyle: "w-96",
  },
};

export const WithHandleSelect: Story = {
  args: {
    baseStyle: "w-96",
    handleSelect: (value) => console.log("Selected:", value),
  },
};
