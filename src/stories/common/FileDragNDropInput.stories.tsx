import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FileDragNDropInput from "@/components/common/FileDragNDropInput";

const meta: Meta<typeof FileDragNDropInput> = {
  title: "Common/FileDragNDropInput",
  component: FileDragNDropInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileDragNDropInput>;

const FileDragNDropInputWrapper = (args: any) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="w-96">
      <FileDragNDropInput {...args} setFiles={setFiles} />
    </div>
  );
};

export const Default: Story = {
  render: FileDragNDropInputWrapper,
  args: {},
};

export const Required: Story = {
  render: FileDragNDropInputWrapper,
  args: {
    required: true,
  },
};

export const WithHelperText: Story = {
  render: FileDragNDropInputWrapper,
  args: {
    helperText: "최대 10MB까지 업로드 가능합니다.",
  },
};

export const WithLimit: Story = {
  render: FileDragNDropInputWrapper,
  args: {
    limit: 3,
    helperText: "최대 3개까지 업로드 가능합니다.",
  },
};
