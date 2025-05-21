import { CustomLabel } from "@/components/common/CustomLabel";
import { ResultReportSchemaType } from "@/lib/types/schema";
import { useEffect } from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const ResultReportMemberCount = () => {
  const [inputValue, setInputValue] = useState(""); // 초기값 빈 문자열
  const [memberCount, setMemberCount] = useState<number>(0);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ResultReportSchemaType>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const value = raw.replace(/[^0-9]/g, ""); // 숫자만 허용

    if (value.length <= 2) {
      setInputValue(value);
      setMemberCount(value === "" ? 0 : Number(value));
    }
  };

  const handleDecrease = () => {
    setMemberCount((prev: number) => {
      const next = prev > 0 ? prev - 1 : 0;
      setInputValue(next === 0 ? "" : next.toString());
      return next;
    });
  };

  const handleIncrease = () => {
    setMemberCount((prev: number) => {
      const next = prev + 1;
      setInputValue(next.toString());
      return next;
    });
  };

  useEffect(() => {
    setValue("data.participantCount", memberCount, { shouldValidate: true });
  }, [memberCount]);

  // 에러 메시지 가져오기
  const getErrorMessage = () => {
    const nameParts = "data.participantCount".split(".");
    let currentErrors: any = errors;

    for (const part of nameParts) {
      if (currentErrors && currentErrors[part]) {
        currentErrors = currentErrors[part];
      } else {
        return undefined;
      }
    }

    return currentErrors?.message?.toString();
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="flex flex-col gap-3">
      <CustomLabel htmlFor="memberCount" labelText="인원수" required={true} />
      <div className="relative">
        <div className="h-[60px] w-[200px] flex items-center border-[1px] border-gray-300 rounded-md overflow-hidden">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={memberCount <= 0}
            className="disabled:bg-gray-200 border-r border-gray-300 w-[57.6px] h-full text-[28px] border-none bg-white cursor-pointer"
          >
            -
          </button>
          <div className="h-full w-px bg-gray-300" />
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="w-[94.6px] text-center text-[16px] border-none outline-none"
            maxLength={2}
            inputMode="numeric"
            placeholder="00"
          />
          <div className="h-full w-px bg-gray-300" />
          <button
            type="button"
            onClick={handleIncrease}
            className="disabled:bg-gray-200 border-r border-gray-300 w-[57.6px] h-full text-[28px] border-none bg-white cursor-pointer"
          >
            +
          </button>
        </div>
        {errorMessage && (
          <div className="absolute text-base font-medium text-point-red mt-1">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultReportMemberCount;
