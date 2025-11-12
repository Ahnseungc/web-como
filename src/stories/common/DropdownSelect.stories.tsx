import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DropdownSelect from "@/components/common/DropdownSelect";

const meta: Meta<typeof DropdownSelect> = {
  title: "Common/DropdownSelect",
  component: DropdownSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownSelect>;

const DropdownSelectWrapper = (args: any) => {
  const [value, setValue] = useState(args.currentValue || "");
  return (
    <DropdownSelect {...args} currentValue={value} handleChange={setValue} />
  );
};

export const Default: Story = {
  render: DropdownSelectWrapper,
  args: {
    id: "dropdown-1",
    options: [
      { name: "옵션 1", value: "option1" },
      { name: "옵션 2", value: "option2" },
      { name: "옵션 3", value: "option3" },
    ],
    currentValue: "",
    placeholder: "옵션을 선택하세요",
  },
};

export const WithSelectedValue: Story = {
  render: DropdownSelectWrapper,
  args: {
    id: "dropdown-2",
    options: [
      { name: "옵션 1", value: "option1" },
      { name: "옵션 2", value: "option2" },
      { name: "옵션 3", value: "option3" },
    ],
    currentValue: "option2",
  },
};

export const Required: Story = {
  render: DropdownSelectWrapper,
  args: {
    id: "dropdown-3",
    options: [
      { name: "옵션 1", value: "option1" },
      { name: "옵션 2", value: "option2" },
      { name: "옵션 3", value: "option3" },
    ],
    currentValue: "option1",
    required: true,
  },
};
