import BackButton from "@/components/dashboard/common/BackButton";
import HostOverview from "@/components/dashboard/club/shop/molecules/HostOverview";
import HostOtherProduct from "@/components/dashboard/club/shop/organisms/HostOtherProduct";
import HostReview from "@/components/dashboard/club/shop/organisms/HostReview";

export default function HostDetailPage() {
  return (
    <>
      <BackButton />
      <HostOverview />
      <HostOtherProduct />
      <HostReview />
    </>
  );
}
