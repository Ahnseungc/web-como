import type { Meta, StoryObj } from "@storybook/react";
import Chip from "@/components/common/Chip";

const meta: Meta<typeof Chip> = {
  title: "Common/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    content: "기본 칩",
  },
};

export const Primary: Story = {
  args: {
    content: "Primary 칩",
    primary: true,
  },
};

export const Orange: Story = {
  args: {
    content: "Orange 칩",
    orange: true,
  },
};

export const Clickable: Story = {
  args: {
    content: "클릭 가능한 칩",
    onClick: () => console.log("Chip clicked"),
  },
};
