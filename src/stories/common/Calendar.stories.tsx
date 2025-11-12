import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Calendar from "@/components/common/Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Common/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const CalendarWrapper = (args: any) => {
  const [selected, setSelected] = useState<Date | undefined>(args.selected);
  return <Calendar {...args} selected={selected} onSelect={setSelected} />;
};

export const Default: Story = {
  render: CalendarWrapper,
  args: {
    selected: undefined,
  },
};

export const WithSelectedDate: Story = {
  render: CalendarWrapper,
  args: {
    selected: new Date(),
  },
};

export const WithDisabledDates: Story = {
  render: CalendarWrapper,
  args: {
    selected: undefined,
    disabled: (date: Date) => date < new Date(),
  },
};
