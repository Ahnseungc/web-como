import {
  CLUB_STATS_TOOLTIP_CONTENT,
  CLUB_STATS_TOOLTIP_TITLE,
} from "@/lib/message/stats";
import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";

export default function ClubStats() {
  return (
    <div className="flex-1 p-8 rounded-xl bg-gray-0">
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-gray-900">{"동호회 통계"}</h2>
        <InfoTooltipButton
          id="club-stats-tooltip"
          title={CLUB_STATS_TOOLTIP_TITLE}
          content={CLUB_STATS_TOOLTIP_CONTENT}
        />
      </div>
    </div>
  );
}
