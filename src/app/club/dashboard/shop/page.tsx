import AdBanners from "@/components/dashboard/shared/shop/molecules/AdBanner";
import ItemSearch from "@/components/dashboard/shared/shop/organisms/ItemSearch";
import ItemList from "@/components/dashboard/shared/shop/organisms/ItemList";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <AdBanners />
      <ItemSearch />
      <ItemList />
    </div>
  );
}
