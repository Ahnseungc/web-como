"use client";

import Button from "@/components/common/Button";
import Card from "@/components/dashboard/common/Card";
import RadioButton from "@/components/common/RadioButton";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ResultReportSchemaType } from "@/lib/types/schema";
import { useRouter } from "next/navigation";

interface ResultReportSubmitCardProps {
  isSubmitting: boolean;
}

const ResultReportSubmitCard = ({
  isSubmitting,
}: ResultReportSubmitCardProps) => {
  const [agree, setAgree] = useState(false);
  const {
    formState: { errors, isValid },
  } = useFormContext<ResultReportSchemaType>();
  const router = useRouter();

  return (
    <Card className="!space-y-6">
      <RadioButton
        name="submit"
        value="submit"
        label={
          "상기와 같이 해당 (기업명) (동호회) 동호회 대표로서 동호회 활동 실적을 보고합니다."
        }
        checked={agree}
        onChange={() => {
          setAgree(!agree);
        }}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" content="취소" onClick={() => router.back()} />
        <Button
          type="submit"
          primary
          content="제출하기"
          disabled={isSubmitting || !agree || !isValid}
        />
      </div>
    </Card>
  );
};

export default ResultReportSubmitCard;
