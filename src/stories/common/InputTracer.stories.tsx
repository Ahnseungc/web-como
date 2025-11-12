import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import InputTracer from "@/components/common/InputTracer";

const meta: Meta<typeof InputTracer> = {
  title: "Common/InputTracer",
  component: InputTracer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputTracer>;

const InputTracerWrapper = (args: any) => {
  const [currentValue, setCurrentValue] = useState(args.currentValue || "");
  return (
    <div className="w-96">
      <InputTracer
        {...args}
        currentValue={currentValue}
        handleChange={(e) => setCurrentValue(e.target.value)}
      />
    </div>
  );
};

export const Default: Story = {
  render: InputTracerWrapper,
  args: {
    name: "input-tracer",
    defaultText: "Hello World",
    currentValue: "",
    correctValue: "",
  },
};

export const WithPartialInput: Story = {
  render: InputTracerWrapper,
  args: {
    name: "input-tracer-partial",
    defaultText: "Hello World",
    currentValue: "Hel",
    correctValue: "Hel",
  },
};

export const WithFullInput: Story = {
  render: InputTracerWrapper,
  args: {
    name: "input-tracer-full",
    defaultText: "Hello World",
    currentValue: "Hello World",
    correctValue: "Hello World",
  },
};
