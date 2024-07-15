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

export const ClubSupport: Story = {
  args: { isDashboard: false, isLoggedIn: true, title: "동호회 관리센터" },
};

export const ClubDashboard: Story = {
  args: { isDashboard: true, isLoggedIn: true, title: "동호회 관리센터" },
};

export const AdminDashboard: Story = {
  args: { isDashboard: true, isLoggedIn: true, title: "주무부서 관리센터" },
};
