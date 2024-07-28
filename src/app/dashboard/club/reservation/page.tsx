import AdBanners from "@/components/dashboard/club/reservation/molecules/AdBanner";
import ItemList from "@/components/dashboard/club/reservation/organisms/ItemList";
import ItemSearch from "@/components/dashboard/club/reservation/organisms/ItemSearch";

export default function ReservationPage() {
  return (
    <div className="flex flex-col gap-5">
      <AdBanners />
      <ItemSearch />
      <ItemList />
    </div>
  );
}
