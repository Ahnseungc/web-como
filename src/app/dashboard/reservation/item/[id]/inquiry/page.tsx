import BackButton from "@/components/dashboard/common/BackButton";
import InquiryForm from "@/components/dashboard/reservation/organisms/InquiryForm";
import InquirySuccessModal from "@/components/dashboard/reservation/organisms/InquirySuccessModal";

export default function ItemInquiryPage() {
  return (
    <>
      <BackButton />
      <InquiryForm />
      <InquirySuccessModal />
    </>
  );
}
