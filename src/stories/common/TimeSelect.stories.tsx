import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TimeSelect from "@/components/common/TimeSelect";

const meta: Meta<typeof TimeSelect> = {
  title: "Common/TimeSelect",
  component: TimeSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TimeSelect>;

const TimeSelectWrapper = (args: any) => {
  const [time, setTime] = useState(args.currentValue || "");
  return <TimeSelect {...args} currentValue={time} handleChange={setTime} />;
};

export const Default: Story = {
  render: TimeSelectWrapper,
  args: {
    id: "time-select-1",
    currentValue: "",
  },
};

export const WithSelectedTime: Story = {
  render: TimeSelectWrapper,
  args: {
    id: "time-select-2",
    currentValue: "09:00",
  },
};

export const Disabled: Story = {
  render: TimeSelectWrapper,
  args: {
    id: "time-select-3",
    currentValue: "",
    disabled: true,
  },
};

export const WithError: Story = {
  render: TimeSelectWrapper,
  args: {
    id: "time-select-4",
    currentValue: "",
    error: "시간을 선택해주세요",
  },
};

export const CustomWidth: Story = {
  render: TimeSelectWrapper,
  args: {
    id: "time-select-5",
    currentValue: "",
    width: "w-64",
  },
};

export const CustomPlaceholder: Story = {
  render: TimeSelectWrapper,
  args: {
    id: "time-select-6",
    currentValue: "",
    placeholder: "시작 시간 선택",
  },
};
