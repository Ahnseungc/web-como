import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Counter from "@/components/common/Counter";

const meta: Meta<typeof Counter> = {
  title: "Common/Counter",
  component: Counter,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Counter>;

const CounterWrapper = (args: any) => {
  const [value, setValue] = useState(args.currentValue || 0);
  return <Counter {...args} currentValue={value} handleChange={setValue} />;
};

export const Default: Story = {
  render: CounterWrapper,
  args: {
    minValue: 0,
    maxValue: 10,
    currentValue: 5,
  },
};

export const AtMinimum: Story = {
  render: CounterWrapper,
  args: {
    minValue: 0,
    maxValue: 10,
    currentValue: 0,
  },
};

export const AtMaximum: Story = {
  render: CounterWrapper,
  args: {
    minValue: 0,
    maxValue: 10,
    currentValue: 10,
  },
};
