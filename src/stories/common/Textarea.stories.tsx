import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Textarea from "@/components/common/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Common/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

const TextareaWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <div className="w-96">
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const Default: Story = {
  render: TextareaWrapper,
  args: {
    name: "textarea",
    placeholder: "텍스트를 입력하세요",
  },
};

export const WithValue: Story = {
  render: TextareaWrapper,
  args: {
    name: "textarea-value",
    value: "기본 텍스트",
  },
};

export const Required: Story = {
  render: TextareaWrapper,
  args: {
    name: "textarea-required",
    placeholder: "필수 입력 항목",
    required: true,
  },
};

export const WithMaxLength: Story = {
  render: TextareaWrapper,
  args: {
    name: "textarea-maxlength",
    placeholder: "최대 100자까지 입력 가능",
    maxlength: 100,
  },
};

export const ReadOnly: Story = {
  render: TextareaWrapper,
  args: {
    name: "textarea-readonly",
    value: "읽기 전용 텍스트",
    readonly: true,
  },
};

export const WithRows: Story = {
  render: TextareaWrapper,
  args: {
    name: "textarea-rows",
    placeholder: "5줄 텍스트 영역",
    rows: 5,
  },
};
