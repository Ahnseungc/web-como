import BackButton from "@/components/dashboard/common/BackButton";
import InquiryShortcut from "@/components/dashboard/club/reservation/molecules/InquiryShortcut";
import ItemDetailOverview from "@/components/dashboard/club/reservation/molecules/ItemOverview";
import ItemDetail from "@/components/dashboard/club/reservation/organisms/ItemDetail";
import ReservationPanel from "@/components/dashboard/club/reservation/organisms/ReservationPanel";

export default function ItemDetailPage() {
  return (
    <>
      <BackButton />
      <ItemDetailOverview />
      <div className="flex items-start gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <ItemDetail />
          <InquiryShortcut />
        </div>
        <ReservationPanel />
      </div>
    </>
  );
}
