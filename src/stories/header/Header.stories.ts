import type { Meta, StoryObj } from "@storybook/react";
import Header from "@/components/header/Header";

const meta: Meta<typeof Header> = {
  title: "Header/Header",
  component: Header,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const Club: Story = {
  args: { isDashboard: true, isLoggedIn: true, type: "club" },
};

export const Company: Story = {
  args: { isDashboard: true, isLoggedIn: true, type: "company" },
};
