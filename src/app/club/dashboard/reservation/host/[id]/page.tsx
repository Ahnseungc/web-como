import BackButton from "@/components/dashboard/common/BackButton";
import HostOverview from "@/components/dashboard/club/reservation/molecules/HostOverview";
import HostOtherProduct from "@/components/dashboard/club/reservation/organisms/HostOtherProduct";
import HostReview from "@/components/dashboard/club/reservation/organisms/HostReview";

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
