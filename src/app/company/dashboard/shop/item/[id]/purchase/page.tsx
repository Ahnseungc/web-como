import BackButton from "@/components/dashboard/common/BackButton";
import PurchaseDetail from "@/components/dashboard/shared/shop/organisms/PurchaseDetail";
import PurchasePanel from "@/components/dashboard/shared/shop/organisms/PurchasePanel";
import PurchaseSuccessModal from "@/components/dashboard/shared/shop/modals/PurchaseSuccessModal";

export default function ItemPurchasePage() {
  return (
    <>
      <BackButton />
      <div className="flex items-start gap-3">
        <PurchaseDetail />
        <PurchasePanel />
      </div>
      <div className="m-0">
      <PurchaseSuccessModal />
      </div>
    </>
  );
}
