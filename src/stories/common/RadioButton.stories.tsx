import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import RadioButton from "@/components/common/RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Common/RadioButton",
  component: RadioButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

const RadioButtonWrapper = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <RadioButton
      {...args}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Default: Story = {
  render: RadioButtonWrapper,
  args: {
    name: "radio",
    value: "option1",
    label: "옵션 1",
    checked: false,
  },
};

export const Checked: Story = {
  render: RadioButtonWrapper,
  args: {
    name: "radio-checked",
    value: "option2",
    label: "선택된 옵션",
    checked: true,
  },
};

export const Required: Story = {
  render: RadioButtonWrapper,
  args: {
    name: "radio-required",
    value: "option3",
    label: "필수 옵션",
    checked: false,
    required: true,
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState("option1");
    return (
      <div className="flex flex-col gap-2">
        <RadioButton
          name="radio-group"
          value="option1"
          label="옵션 1"
          checked={selected === "option1"}
          onChange={() => setSelected("option1")}
        />
        <RadioButton
          name="radio-group"
          value="option2"
          label="옵션 2"
          checked={selected === "option2"}
          onChange={() => setSelected("option2")}
        />
        <RadioButton
          name="radio-group"
          value="option3"
          label="옵션 3"
          checked={selected === "option3"}
          onChange={() => setSelected("option3")}
        />
      </div>
    );
  },
};
