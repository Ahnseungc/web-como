import BackButton from "@/components/dashboard/club/common/BackButton";
import InquiryForm from "@/components/dashboard/club/reservation/organisms/InquiryForm";
import InquirySuccessModal from "@/components/dashboard/club/reservation/organisms/InquirySuccessModal";

export default function ItemInquiryPage() {
  return (
    <>
      <BackButton />
      <InquiryForm />
      <InquirySuccessModal />
    </>
  );
}
