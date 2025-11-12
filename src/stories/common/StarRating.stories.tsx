import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import StarRating from "@/components/common/StarRating";

const meta: Meta<typeof StarRating> = {
  title: "Common/StarRating",
  component: StarRating,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StarRating>;

const StarRatingWrapper = (args: any) => {
  const [rating, setRating] = useState(args.currentValue || 0);
  return (
    <StarRating {...args} currentValue={rating} handleChange={setRating} />
  );
};

export const Default: Story = {
  render: StarRatingWrapper,
  args: {
    currentValue: 0,
    name: "rating",
  },
};

export const WithRating: Story = {
  render: StarRatingWrapper,
  args: {
    currentValue: 3,
    name: "rating-3",
  },
};

export const WithLabel: Story = {
  render: StarRatingWrapper,
  args: {
    currentValue: 0,
    name: "rating-label",
    label: "평점",
  },
};

export const ReadOnly: Story = {
  args: {
    currentValue: 4,
    name: "rating-readonly",
    readonly: true,
  },
};

export const Small: Story = {
  render: StarRatingWrapper,
  args: {
    currentValue: 3,
    name: "rating-small",
    size: "small",
  },
};

export const Large: Story = {
  render: StarRatingWrapper,
  args: {
    currentValue: 3,
    name: "rating-large",
    size: "large",
  },
};
