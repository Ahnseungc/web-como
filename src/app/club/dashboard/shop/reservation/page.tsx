import ReservationTitle from "@/components/dashboard/club/shop/molecules/ReservationTitle";
import ReservationOverview from "@/components/dashboard/club/shop/organisms/ReservationOverview";
import ReservationSearch from "@/components/dashboard/club/shop/molecules/ReservationSearch";
import ReservationList from "@/components/dashboard/club/shop/organisms/ReservationList";
import ReservationCancelModal from "@/components/dashboard/club/shop/modals/ReservationCancelModal";

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
