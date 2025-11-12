import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ConfirmDialog from "@/components/common/ConfirmDialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Common/ConfirmDialog",
  component: ConfirmDialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

const ConfirmDialogWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>다이얼로그 열기</button>
      <ConfirmDialog
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log("Confirmed");
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: ConfirmDialogWrapper,
  args: {
    isOpen: false,
    title: "확인",
    message: "정말로 이 작업을 수행하시겠습니까?",
  },
};

export const WithCustomText: Story = {
  render: ConfirmDialogWrapper,
  args: {
    isOpen: false,
    title: "삭제 확인",
    message: "이 항목을 삭제하시겠습니까?",
    confirmText: "삭제",
    cancelText: "취소",
  },
};
