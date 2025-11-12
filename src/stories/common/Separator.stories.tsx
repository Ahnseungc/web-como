import type { Meta, StoryObj } from "@storybook/react";
import Separator from "@/components/common/Separator";

const meta: Meta<typeof Separator> = {
  title: "Common/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {},
};

export const InContext: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>위쪽 콘텐츠</div>
      <Separator />
      <div>아래쪽 콘텐츠</div>
    </div>
  ),
};
