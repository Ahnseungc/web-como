import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Checkbox from "@/components/common/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Common/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const CheckboxWrapper = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  render: CheckboxWrapper,
  args: {
    name: "checkbox",
    content: "체크박스",
    checked: false,
  },
};

export const Checked: Story = {
  render: CheckboxWrapper,
  args: {
    name: "checkbox-checked",
    content: "체크된 체크박스",
    checked: true,
  },
};

export const WithCustomFillColor: Story = {
  render: CheckboxWrapper,
  args: {
    name: "checkbox-custom",
    content: "커스텀 색상",
    checked: true,
    fillColor: "#FF6B6B",
  },
};
