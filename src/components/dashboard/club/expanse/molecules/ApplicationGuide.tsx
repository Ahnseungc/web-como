import { INFO, INFO_TOOLTIP } from "@/lib/message/expanse";
import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";

export default function ApplicationGuide() {
  return (
    <div className="space-y-2 p-8 rounded-2xl bg-gray-0">
      <div className="relative flex items-center gap-2">
        <h2 className="h1 font-bold text-brand-orange">{"활동비 신청 안내"}</h2>
        <InfoTooltipButton
          id="expanse-application-info"
          title="활동비 신청 안내"
          content={INFO_TOOLTIP}
        />
      </div>
      <div className="flex items-end justify-between">
        <p className="h4 font-medium text-gray-900">{INFO}</p>
        <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-900">
          {"활동비 규정 안내서 다운받기"}
        </button>
      </div>
    </div>
  );
}
