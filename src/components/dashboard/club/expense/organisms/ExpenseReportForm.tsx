"use client";

import { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import { useParams } from "next/navigation";
import { getExpenseDetail } from "@/api/actions/company/expense/getExpensedetail";
import { Document } from "@/assets/icons/util";
import { SaveButton } from "@/components/dashboard/common/DocUtil";

type ExpenseFormValues = {
  eventName: string;
  description: string;
  note: string;
  location: string;
  participantCount: number;
  amount: number;
  details: string;
  file: string | null;
};

const decodeKoreanFromUrl = (url: string) => {
  try {
    return decodeURIComponent(url);
  } catch (e) {
    console.error("URL 디코딩 중 오류 발생:", e);
    return url;
  }
};

const extractKoreanFileName = (url: string) => {
  try {
    const decodedUrl = decodeKoreanFromUrl(url);
    // URL에서 마지막 '/' 이후의 문자열을 가져옴
    const fileName = decodedUrl.split("/").pop() || "";
    // 파일 확장자를 제외한 이름만 추출
    const nameWithoutExtension = fileName.split(".").slice(0, -1).join(".");
    // 해시값과 한글 사이의 '[', '_', '+' 를 기준으로 분리하여 한글 부분만 추출
    const koreanName = nameWithoutExtension.split(/[\[_+]/).pop() || "";
    return koreanName;
  } catch (e) {
    console.error("파일명 추출 중 오류 발생:", e);
    return url;
  }
};

export default function ExpenseReportForm() {
  const [formValues, setFormValues] = useState<ExpenseFormValues | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchExpense = async () => {
      const expense = await getExpenseDetail(Number(id));
      setFormValues({
        eventName: expense.eventName,
        description: expense.description,
        note: expense.note,
        location: expense.location,
        participantCount: expense.participantCount,
        amount: expense.amount,
        details: expense.details,
        file: expense.file,
      });
    };
    fetchExpense();
  }, [id]);

  if (!formValues) {
    return <div>Loading...</div>;
  }
  const handleFileDownload = (fileUrl: string) => {
    const decodedUrl = decodeKoreanFromUrl(fileUrl);
    const link = document.createElement("a");
    link.href = decodedUrl;
    link.download = ""; // 파일명을 지정하고 싶다면 여기에 입력
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <form className="space-y-3 w-full">
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
        <Input
          value={formValues.eventName}
          name="eventName"
          label="행사명"
          type="text"
          placeholder="행사명을 입력해주세요."
          readOnly
          required
        />
        <Input
          value={formValues.description}
          name="description"
          label="활동 내용"
          type="text"
          maxLength={1000}
          placeholder="활동 내용을 입력해주세요."
          readOnly
          inputStyle="min-h-[200px]"
          required
        />
        <Input
          value={formValues.note}
          name="note"
          label="주요 내용"
          type="text"
          maxLength={1000}
          placeholder="주요 내용을 입력하세요."
          inputStyle="min-h-[200px]"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
        <h3 className="h2 font-bold text-gray-900">{"지급 계좌 정보"}</h3>
        <Input
          required
          value={formValues.location}
          inputStyle="max-w-[350px]"
          name="location"
          label="지급 계좌"
          type="text"
          placeholder="위치를 입력하세요."
          readOnly
        />
        <Input
          required
          value={formValues.participantCount.toString()}
          inputStyle="max-w-[350px]"
          name="participantCount"
          label="참여 인원"
          type="number"
          placeholder="인원수를 입력해주세요."
          readOnly
        />
        <Input
          required
          value={formValues.amount.toString()}
          inputStyle="max-w-[350px]"
          name="amount"
          label="신청 금액"
          type="number"
          placeholder="금액을 입력해주세요."
          readOnly
        />
        <Input
          required
          value={formValues.details}
          name="details"
          label="산출 내역"
          type="text"
          placeholder="산출 내역을 입력해주세요."
          readOnly
          maxLength={1000}
          inputStyle="min-h-[200px]"
        />

        <div className="space-y-2">
          <div className="flex">
            <h3 className="font-semibold text-gray-900">{"첨부 파일"}</h3>
            <h3 className="text-point-red">{"*"}</h3>
          </div>

          {formValues.file && (
            <div
              onClick={() => {
                if (formValues.file) handleFileDownload(formValues.file);
              }}
              className="flex items-center justify-between p-3 rounded-md border border-gray-400 bg-gray-0 cursor-pointer"
            >
              <div className="flex gap-2 h4 font-medium text-gray-800">
                {extractKoreanFileName(formValues.file)}
              </div>
              <SaveButton />
            </div>
          )}
          {!formValues.file && (
            <div className="flex items-center justify-between p-3 rounded-md border border-gray-400 bg-gray-0">
              <div className="flex gap-2 h4 font-medium text-gray-800">
                첨부 파일이 없습니다.
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 rounded-xl bg-gray-0 text-xl font-suit">
        {`상기와 같이 해당 ${formValues.eventName} 활동의 지원금을 요청합니다.`}
      </div>
    </form>
  );
}
