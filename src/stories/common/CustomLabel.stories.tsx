import type { Meta, StoryObj } from "@storybook/react";
import { CustomLabel } from "@/components/common/CustomLabel";

const meta: Meta<typeof CustomLabel> = {
  title: "Common/CustomLabel",
  component: CustomLabel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomLabel>;

export const Default: Story = {
  args: {
    htmlFor: "input-id",
    labelText: "라벨",
  },
};

export const Required: Story = {
  args: {
    htmlFor: "input-id-required",
    labelText: "필수 항목",
    required: true,
  },
};

export const WithCustomClassName: Story = {
  args: {
    htmlFor: "input-id-custom",
    labelText: "커스텀 스타일",
    className: "text-blue-500",
  },
};
