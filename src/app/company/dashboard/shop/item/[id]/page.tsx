import BackButton from "@/components/dashboard/common/BackButton";
import ItemDetailOverview from "@/components/dashboard/shared/shop/molecules/ItemOverview";
import ItemDetail from "@/components/dashboard/shared/shop/organisms/ItemDetail";
import ReviewList from "@/components/dashboard/shared/shop/organisms/ReviewList";
import InquiryShortcut from "@/components/dashboard/shared/shop/molecules/InquiryShortcut";
import ReservationPanel from "@/components/dashboard/shared/shop/organisms/ReservationPanel";

export default function ItemDetailPage() {
  return (
    <>
      <BackButton />
      <div className="flex items-start gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <ItemDetailOverview />
          <ItemDetail />
          <ReviewList headingStyle="h4 font-bold" />
          <InquiryShortcut />
        </div>
        <ReservationPanel />
      </div>
    </>
  );
}
