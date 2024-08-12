import ReservationTitle from "@/components/dashboard/shared/shop/molecules/ReservationTitle";
import ReservationOverview from "@/components/dashboard/company/shop/organisms/ReservationOverview";
import ReservationSearch from "@/components/dashboard/shared/shop/molecules/ReservationSearch";
import ReservationList from "@/components/dashboard/shared/shop/organisms/ReservationList";
import ReservationCancelModal from "@/components/dashboard/shared/shop/modals/ReservationCancelModal";

export default function ReservationPage() {
  return (
    <>
      <ReservationTitle />
      <ReservationOverview />
      <ReservationSearch />
      <ReservationList />
      <div className="m-0">
        <ReservationCancelModal />
      </div>
    </>
  );
}
