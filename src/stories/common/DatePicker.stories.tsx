import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DatePicker from "@/components/common/DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Common/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const DatePickerWrapper = (args: any) => {
  const [date, setDate] = useState<Date | undefined>(args.currentDate);
  return <DatePicker {...args} currentDate={date} handleDateChange={setDate} />;
};

export const Default: Story = {
  render: DatePickerWrapper,
  args: {
    id: "datepicker-1",
    currentDate: undefined,
  },
};

export const WithSelectedDate: Story = {
  render: DatePickerWrapper,
  args: {
    id: "datepicker-2",
    currentDate: new Date(),
  },
};

export const DisablePastDates: Story = {
  render: DatePickerWrapper,
  args: {
    id: "datepicker-3",
    currentDate: undefined,
    disablePastDates: true,
  },
};

export const Disabled: Story = {
  render: DatePickerWrapper,
  args: {
    id: "datepicker-4",
    currentDate: undefined,
    disabled: true,
  },
};
