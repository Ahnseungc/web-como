import ReservationTitle from "@/components/dashboard/club/reservation/molecules/ReservationTitle";
import ReservationOverview from "@/components/dashboard/club/reservation/organisms/ReservationOverview";
import ReservationSearch from "@/components/dashboard/club/reservation/molecules/ReservationSearch";
import ReservationList from "@/components/dashboard/club/reservation/organisms/ReservationList";
import ReservationCancelModal from "@/components/dashboard/club/reservation/organisms/ReservationCancelModal";

export default function ReservationManagementPage() {
  return (
    <>
      <ReservationTitle />
      <ReservationOverview />
      <ReservationSearch />
      <ReservationList />
      <ReservationCancelModal />
    </>
  );
}
