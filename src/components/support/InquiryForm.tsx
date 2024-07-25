"use client";

import { useEffect, useState } from "react";
import { openModal } from "@/lib/utils";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const initialFormValues = {
  name: "",
  company: "",
  phone: "",
  email: "",
  content: "",
};

export default function InquiryForm() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    const hasEmptyField = Object.values(formValues).some(
      (value) => value.trim() === ""
    );
    setIsDisabled(hasEmptyField);
  }, [formValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    setFormValues(initialFormValues);
    openModal("submit-success");
  };

  return (
    <form
      className="space-y-6 w-full max-w-[1194px] mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="h1 font-bold text-gray-900">{"문의 및 기술 지원"}</h2>
      <Input
        type="text"
        name="name"
        label="이름"
        currentValue={formValues.name}
        handleInputChange={handleChange}
      />
      <Input
        type="text"
        name="company"
        label="기업명"
        currentValue={formValues.company}
        handleInputChange={handleChange}
      />
      <Input
        type="tel"
        name="phone"
        label="연락처"
        currentValue={formValues.phone}
        handleInputChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        label="이메일 주소"
        currentValue={formValues.email}
        handleInputChange={handleChange}
      />
      <Input
        type="text"
        name="content"
        label="문의사항"
        maxChar={300}
        rows={3}
        currentValue={formValues.content}
        handleInputChange={handleChange}
      />
      <div className="text-center">
        <Button
          primary
          content="확인"
          className="max-w-[480px]"
          disabled={isDisabled}
        />
      </div>
    </form>
  );
}
