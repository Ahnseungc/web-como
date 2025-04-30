import { INFO, INFO_TOOLTIP } from "@/lib/message/expense";
import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";

export default function ApplicationGuide() {
  return (
    <div className="space-y-2 p-8 rounded-2xl bg-gray-0">
      <div className="relative flex items-center gap-2">
        <h2 className="h1 font-bold text-brand-orange">
          {"활동지원비 신청 안내"}
        </h2>
        <InfoTooltipButton
          id="expense-application-info"
          title="활동지원비 신청 안내"
          content={INFO_TOOLTIP}
        />
      </div>
      <div className="flex items-end justify-between">
        <p className="h4 font-medium text-gray-900">{INFO}</p>
      </div>
    </div>
  );
}
