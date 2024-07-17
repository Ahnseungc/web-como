import AdBanners from "@/components/dashboard/reservation/molecules/AdBanner";
import ItemList from "@/components/dashboard/reservation/organisms/ItemList";
import ItemSearch from "@/components/dashboard/reservation/organisms/ItemSearch";

export default function ReservationPage() {
  return (
    <>
      <AdBanners />
      <ItemSearch />
      <ItemList />
    </>
  );
}
