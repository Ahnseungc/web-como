import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DragNDrop from "@/components/common/DragNDrop";
import { Document } from "@/assets/icons/util";

const meta: Meta<typeof DragNDrop> = {
  title: "Common/DragNDrop",
  component: DragNDrop,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DragNDrop>;

const DragNDropWrapper = (args: any) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="w-96">
      <DragNDrop {...args} onFilesChange={setFiles} />
    </div>
  );
};

export const Default: Story = {
  render: DragNDropWrapper,
  args: {
    style:
      "flex items-center justify-center gap-1 h-32 rounded-md border border-gray-400 h4 font-medium text-gray-500 bg-gray-0 select-none",
    placeholder: (
      <>
        <Document className="w-6 h-6" />
        파일을 드래그하거나 클릭하세요
      </>
    ),
  },
};

export const WithLimit: Story = {
  render: DragNDropWrapper,
  args: {
    style:
      "flex items-center justify-center gap-1 h-32 rounded-md border border-gray-400 h4 font-medium text-gray-500 bg-gray-0 select-none",
    placeholder: (
      <>
        <Document className="w-6 h-6" />
        최대 3개까지 업로드 가능
      </>
    ),
    limit: 3,
  },
};
