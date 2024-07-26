import ReservationTitle from "@/components/dashboard/reservation/molecules/ReservationTitle";
import ReservationOverview from "@/components/dashboard/reservation/organisms/ReservationOverview";
import ReservationSearch from "@/components/dashboard/reservation/molecules/ReservationSearch";
import ReservationList from "@/components/dashboard/reservation/organisms/ReservationList";

export default function ReservationManagementPage() {
  return (
    <>
      <ReservationTitle />
      <ReservationOverview />
      <ReservationSearch />
      <ReservationList />
    </>
  );
}
