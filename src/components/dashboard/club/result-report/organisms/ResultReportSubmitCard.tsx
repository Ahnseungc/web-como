"use client";

import Button from "@/components/common/Button";
import Card from "@/components/dashboard/common/Card";
import RadioButton from "@/components/common/RadioButton";
import { useState } from "react";

const ResultReportSubmitCard = () => {
  const [agree, setAgree] = useState(false);

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
      <Button
        content={"제출하기"}
        primary
        type="submit"
        disabled={!agree}
        className="w-full"
      />
    </Card>
  );
};

export default ResultReportSubmitCard;
