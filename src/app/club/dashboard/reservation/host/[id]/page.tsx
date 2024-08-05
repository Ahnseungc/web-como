import BackButton from "@/components/dashboard/common/BackButton";
import HostOverview from "@/components/dashboard/club/reservation/molecules/HostOverview";
import HostOtherProducts from "@/components/dashboard/club/reservation/organisms/HostOtherProducts";

export default function HostDetailPage() {
  return (
    <>
      <BackButton />
      <HostOverview />
      <HostOtherProducts />
    </>
  );
}
