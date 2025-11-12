import type { Meta, StoryObj } from "@storybook/react";
import { CustomTextInput } from "@/components/common/CustomTextInput";

const meta: Meta<typeof CustomTextInput> = {
  title: "Common/CustomTextInput",
  component: CustomTextInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomTextInput>;

export const Default: Story = {
  args: {
    id: "input-id",
    name: "input",
    placeholder: "텍스트를 입력하세요",
  },
};

export const WithValue: Story = {
  args: {
    id: "input-id-value",
    name: "input-value",
    defaultValue: "기본 값",
  },
};

export const ReadOnly: Story = {
  args: {
    id: "input-id-readonly",
    name: "input-readonly",
    defaultValue: "읽기 전용",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "input-id-disabled",
    name: "input-disabled",
    placeholder: "비활성화된 입력",
    disabled: true,
  },
};
