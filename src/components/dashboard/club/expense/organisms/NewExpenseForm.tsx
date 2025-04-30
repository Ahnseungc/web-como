"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CLUB_DASHBOARD_ENDPOINT } from "@/lib/constants";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import RadioButton from "@/components/common/RadioButton";
import ImageInput from "@/components/common/ImageInput";
import DropdownSelect from "@/components/common/DropdownSelect";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { useMutation } from "@tanstack/react-query";
import { format } from "path";

const types = [
  { name: "활동비 지원", value: "activity" },
  { name: "비품 구매", value: "supply" },
  { name: "우수 동호회 상금", value: "prize" },
  { name: "기타", value: "etc" },
];

interface Props {
  clubName?: string;
  accessToken: string | undefined;
  clubId: string | undefined;
}

export default function NewExpenseReportForm({
  clubName,
  accessToken,
  clubId,
}: Props) {
  const { replace, refresh } = useRouter();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [formValues, setFormValues] = useState({
    eventName: "",
    description: "",
    note: "",
    participantsCount: "",
    location: "",
    amount: "",
    details: "",
  });
  const [currentImages, setCurrentImages] = useState<File[]>([]);
  const [currentImagesBankAccount, setCurrentImagesBankAccount] = useState<
    File[]
  >([]);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formValues.eventName.trim() === "" ||
      formValues.description.trim() === "" ||
      formValues.location.trim() === "" ||
      formValues.participantsCount.trim() === "" ||
      formValues.amount.trim() === "" ||
      formValues.details.trim() === "" ||
      currentImagesBankAccount.length === 0
    ) {
      alert("필수 입력란을 입력해주세요.");
    } else {
      mutate(); // 폼 데이터를 제출하는 함수 호출
    }

    //   alert(
    //     "활동비 지급 신청서 (품의서)가 작성 및 담당 부서에게 전달되었습니다."
    //   );
    //   replace(`${CLUB_DASHBOARD_ENDPOINT}/expense`);
    // };
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  console.log(formValues);

  const a = "100,000,0000";

  console.log(Number(a.split(",").join("")));

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const formData = new FormData();

        // formData.append("eventName", formValues.eventName);
        // formData.append("description", formValues.description);
        // formData.append("note", formValues.note);
        // formData.append("participantsCount", formValues.participantsCount);
        // formData.append("location", formValues.location);
        // formData.append("amount", formValues.amount);
        // formData.append("details", formValues.details);

        const data = {
          eventName: formValues.eventName,
          description: formValues.description,
          note: formValues.note,
          participantsCount: Number(formValues.participantsCount),
          location: formValues.location,
          amount: Number(formValues.amount.split(",").join("")),
          details: formValues.details,
        };
        const JsonData = JSON.stringify(data);

        const blob = new Blob([JsonData], { type: "application/json" });
        formData.append("data", blob);

        if (currentImagesBankAccount[0]) {
          formData.append("planFile", currentImagesBankAccount[0]);
        }

        const response = await fetch(
          `/api/server/v1/executive/club/${clubId}/activity-expenses`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        return result;
      } catch (error) {
        console.error("Error during fetch:", error);
        throw error;
      }
    },
    onError: (e) => {
      console.error("Mutation error:", e);
    },
    onSuccess: (data) => {
      if (data.resultCode === "OK") {
        alert(
          "활동비 지급 신청서 (품의서)가 작성 및 담당 부서에게 전달되었습니다."
        );
        refresh();
        replace(`${CLUB_DASHBOARD_ENDPOINT}/expense`);
      }
    },
  });

  const formatAmount = (amount: string) => {
    const numberValue = parseFloat(amount.replace(/,/g, ""));
    if (!isNaN(numberValue)) {
      return numberValue.toLocaleString();
    }
    return amount;
  };

  return (
    <form className="space-y-3 w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"활동 개요"}</h3>
        <Input
          required
          name="eventName"
          label="행사명"
          type="text"
          value={formValues.eventName}
          placeholder="행사명을 입력하세요."
          handleInputChange={(e) => {
            handleInput(e);
          }}
        />
        {/* <div className="flex flex-col gap-2">
          <span className="h3 font-semibold text-gray-900">{"비목"}</span>
          <DropdownSelect
            required
            id="type"
            placeholder="비목 선택"
            options={types}
            currentValue={formValues.type}
            handleChange={(newValue) =>
              setFormValues((prev) => {
                return { ...prev, type: newValue };
              })
            }
          />
        </div> */}
        <Input
          required
          name="description"
          label="활동 내용"
          type="text"
          currentValue={formValues.description}
          maxLength={1000}
          placeholder="활동비의 사용 용도를 입력하세요."
          handleInputChange={(e) => {
            setFormValues((prev) => {
              return { ...prev, description: e.target.value };
            });
          }}
        />
        <Input
          name="note"
          label="주요 내용"
          type="text"
          placeholder="내용을 입력하세요."
          maxLength={1000}
          currentValue={formValues.note}
          handleInputChange={(e) => {
            setFormValues((prev) => {
              return { ...prev, note: e.target.value };
            });
          }}
        />
        {/* <ImageInput
          required
          name="estimate-image"
          label="예상 비용 견적서 첨부"
          caption="해당 관련 견적서 및 금액을 증빙 할 수 있는 캡쳐본을 첨부해주세요."
          currentImages={currentImages}
          setCurrentImages={setCurrentImages}
        /> */}
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"신청 금액"}</h3>
        <Input
          required
          name="location"
          label="장소(사용처)"
          type="text"
          placeholder="위치를 입력하세요."
          inputStyle="max-w-[350px]"
          value={formValues.location}
          handleInputChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          required
          name="participantsCount"
          label="참여 인원"
          type="number"
          placeholder="인원수를 입력하세요."
          inputStyle="max-w-[350px]"
          value={formValues.participantsCount}
          handleInputChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          required
          name="amount"
          label="신청 금액"
          type="text"
          placeholder="금액을 입력하세요."
          inputStyle="max-w-[350px]"
          value={formatAmount(formValues.amount)}
          handleInputChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          required
          name="details"
          label="산출 내역"
          type="text"
          placeholder="산출 내역을 입력하세요."
          maxLength={1000}
          currentValue={formValues.details}
          handleInputChange={(e) => {
            setFormValues((prev) => {
              return { ...prev, details: e.target.value };
            });
          }}
        />
        <ImageInput
          required
          max={1}
          acceptDocs
          name="planFile"
          label="행사 계획서 첨부"
          caption="계획서 파일을 첨부하세요."
          currentImages={currentImagesBankAccount}
          setCurrentImages={setCurrentImagesBankAccount}
        />
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <RadioButton
          required
          type="checkbox"
          name="check"
          label={`상기와 같이 해당 ${clubName}의 지원금을 요청합니다.`}
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
        <Button disabled={!isChecked} content="제출하기" primary />
      </div>
    </form>
  );
}
