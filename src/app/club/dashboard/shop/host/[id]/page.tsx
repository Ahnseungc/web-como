import BackButton from "@/components/dashboard/common/BackButton";
import HostOverview from "@/components/dashboard/shared/shop/molecules/HostOverview";
import HostOtherProduct from "@/components/dashboard/shared/shop/organisms/HostOtherProduct";
import HostReview from "@/components/dashboard/shared/shop/organisms/HostReview";

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
