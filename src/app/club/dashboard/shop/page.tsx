import AdBanners from "@/components/dashboard/club/shop/molecules/AdBanner";
import ItemSearch from "@/components/dashboard/club/shop/organisms/ItemSearch";
import ItemList from "@/components/dashboard/club/shop/organisms/ItemList";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <AdBanners />
      <ItemSearch />
      <ItemList />
    </div>
  );
}
