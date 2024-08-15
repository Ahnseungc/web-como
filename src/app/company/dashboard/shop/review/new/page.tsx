import BackButton from "@/components/dashboard/common/BackButton";
import NewReviewForm from "@/components/dashboard/shared/shop/organisms/NewReviewForm";
import ReviewSubmitSuccessModal from "@/components/dashboard/shared/shop/modals/ReviewSubmitSuccessModal";

export default function Page() {
  return (
    <>
      <BackButton />
      <NewReviewForm />
      <div className="m-0">
        <ReviewSubmitSuccessModal />
      </div>
    </>
  );
}
