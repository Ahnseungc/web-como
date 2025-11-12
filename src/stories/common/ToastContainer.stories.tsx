import type { Meta, StoryObj } from "@storybook/react";
import { ToastContainer, useToast } from "@/components/common/ToastContainer";

const meta: Meta<typeof ToastContainer> = {
  title: "Common/ToastContainer",
  component: ToastContainer,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

const ToastDemo = () => {
  const { showToast } = useToast();

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Toast 예제</h2>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => showToast("성공 메시지", "success")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Success Toast
        </button>
        <button
          onClick={() => showToast("에러 메시지", "error")}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Error Toast
        </button>
        <button
          onClick={() => showToast("경고 메시지", "warning")}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Warning Toast
        </button>
        <button
          onClick={() => showToast("정보 메시지", "info")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Info Toast
        </button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ToastContainer>
      <ToastDemo />
    </ToastContainer>
  ),
};
