import BackButton from "@/components/dashboard/common/BackButton";
import HostOverview from "@/components/dashboard/shared/shop/molecules/HostOverview";
import HostOtherProduct from "@/components/dashboard/shared/shop/organisms/HostOtherProduct";
import ReviewList from "@/components/dashboard/shared/shop/organisms/ReviewList";

export default function HostDetailPage() {
  return (
    <>
      <BackButton />
      <HostOverview />
      <HostOtherProduct />
      <ReviewList headingStyle="h2 font-semibold" />
    </>
  );
}
