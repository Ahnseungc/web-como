import BackButton from "@/components/dashboard/common/BackButton";
import InquiryShortcut from "@/components/dashboard/reservation/molecules/InquiryShortcut";
import ItemDetail from "@/components/dashboard/reservation/organisms/ItemDetail";
import ReservationPanel from "@/components/dashboard/reservation/organisms/ReservationPanel";

export default function ItemDetailPage() {
  return (
    <>
      <BackButton />
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <ItemDetail />
          <InquiryShortcut />
        </div>
        {/* <div className="w-[490px]" /> */}
        <ReservationPanel />
      </div>
    </>
  );
}
