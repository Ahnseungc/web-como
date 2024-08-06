import BackButton from "@/components/dashboard/common/BackButton";
import InquiryForm from "@/components/dashboard/club/shop/organisms/InquiryForm";
import InquirySuccessModal from "@/components/dashboard/club/shop/modals/InquirySuccessModal";

export default function ItemInquiryPage() {
  return (
    <>
      <BackButton />
      <InquiryForm />
      <div className="m-0">
        <InquirySuccessModal />
      </div>
    </>
  );
}
