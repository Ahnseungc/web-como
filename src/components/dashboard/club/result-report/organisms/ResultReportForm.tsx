"use client";

import RHFTextInput from "@/components/common/RHF/RHFTextInput";
import { ResultReportSchemaType } from "@/lib/types/schema";
import ResultReportMemberCount from "../molecules/ResultReportMemberCount";
import Card from "@/components/dashboard/common/Card";
import ResultReportPhotCard from "./ResultReportPhotCard";
import ResultReportDate from "./ResultReportDate";
import ResultReportGeo from "./ResultReportGeo";

const ResultReportForm = () => {
  // const methods = useFormContext();

  return (
    <Card className="">
      <section className="w-full flex flex-col gap-6">
        <RHFTextInput<ResultReportSchemaType>
          name="data.eventName"
          id="data.eventName"
          labelText="행사명"
          placeholder="행사명을 작성해 주세요"
          autoComplete="off"
          inputStyle="pr-9"
          required
          maxLength={30}
        />
        <ResultReportDate
          maxWidth="max-w-[712px]"
          timeSelectWidth="w-[350px]"
        />
        <ResultReportGeo type="EDIT" maxWidth="max-w-[712px]" />
        <ResultReportMemberCount />
        <RHFTextInput<ResultReportSchemaType>
          name="data.activityContent"
          id="data.activityContent"
          labelText="주요 활동 내용"
          autoComplete="off"
          placeholder="주요 활동 내용을 상세하게 적어주세요"
          inputStyle="pr-9"
          required
          maxLength={1000}
          rows={6}
        />
        <RHFTextInput<ResultReportSchemaType>
          name="data.note"
          id="data.note"
          labelText="비고"
          autoComplete="off"
          placeholder="비고를 입력해 주세요."
          inputStyle="pr-9"
          maxLength={300}
          rows={1}
        />
        <ResultReportPhotCard />
      </section>
    </Card>
  );
};

export default ResultReportForm;
