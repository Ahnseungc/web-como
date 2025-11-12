import type { Meta, StoryObj } from "@storybook/react";
import { CustomTextarea } from "@/components/common/CustomTextarea";

const meta: Meta<typeof CustomTextarea> = {
  title: "Common/CustomTextarea",
  component: CustomTextarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomTextarea>;

export const Default: Story = {
  args: {
    id: "textarea-id",
    name: "textarea",
    placeholder: "텍스트를 입력하세요",
  },
};

export const WithValue: Story = {
  args: {
    id: "textarea-id-value",
    name: "textarea-value",
    defaultValue: "기본 텍스트",
  },
};

export const ReadOnly: Story = {
  args: {
    id: "textarea-id-readonly",
    name: "textarea-readonly",
    defaultValue: "읽기 전용 텍스트",
    readOnly: true,
  },
};

export const WithMaxLength: Story = {
  args: {
    id: "textarea-id-maxlength",
    name: "textarea-maxlength",
    placeholder: "최대 100자까지 입력 가능",
    maxLength: 100,
  },
};
