import BackButton from "@/components/dashboard/common/BackButton";
import PurchaseDetail from "@/components/dashboard/reservation/organisms/PurchaseDetail";
import PurchasePanel from "@/components/dashboard/reservation/organisms/PurchasePanel";
import PurchaseSuccessModal from "@/components/dashboard/reservation/organisms/PurchaseSuccessModal";

export default function ItemPurchasePage() {
  return (
    <>
      <BackButton />
      <div className="flex items-start gap-3">
        <PurchaseDetail />
        <PurchasePanel />
      </div>
      <PurchaseSuccessModal />
    </>
  );
}
