import type { Meta, StoryObj } from "@storybook/react";
import Toast from "@/components/common/Toast";

const meta: Meta<typeof Toast> = {
  title: "Common/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    message: "성공적으로 완료되었습니다!",
    type: "success",
  },
};

export const Error: Story = {
  args: {
    message: "오류가 발생했습니다.",
    type: "error",
  },
};

export const Warning: Story = {
  args: {
    message: "경고 메시지입니다.",
    type: "warning",
  },
};

export const Info: Story = {
  args: {
    message: "정보 메시지입니다.",
    type: "info",
  },
};

export const Default: Story = {
  args: {
    message: "기본 메시지입니다.",
  },
};
