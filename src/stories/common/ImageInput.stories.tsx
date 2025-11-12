import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ImageInput from "@/components/common/ImageInput";

const meta: Meta<typeof ImageInput> = {
  title: "Common/ImageInput",
  component: ImageInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageInput>;

const ImageInputWrapper = (args: any) => {
  const [images, setImages] = useState<File[]>(args.currentImages || []);
  return (
    <ImageInput {...args} currentImages={images} setCurrentImages={setImages} />
  );
};

export const Default: Story = {
  render: ImageInputWrapper,
  args: {
    name: "image-input",
    currentImages: [],
    label: "이미지 업로드",
  },
};

export const Required: Story = {
  render: ImageInputWrapper,
  args: {
    name: "image-input-required",
    currentImages: [],
    label: "이미지 업로드",
    required: true,
  },
};

export const WithMax: Story = {
  render: ImageInputWrapper,
  args: {
    name: "image-input-max",
    currentImages: [],
    label: "이미지 업로드 (최대 3개)",
    max: 3,
  },
};

export const ReadOnly: Story = {
  render: ImageInputWrapper,
  args: {
    name: "image-input-readonly",
    currentImages: [],
    label: "이미지 (읽기 전용)",
    readonly: true,
  },
};

export const WithCaption: Story = {
  render: ImageInputWrapper,
  args: {
    name: "image-input-caption",
    currentImages: [],
    label: "이미지 업로드",
    caption: "JPG, PNG 형식만 업로드 가능합니다.",
  },
};
