import ClubQnaAnswer from "@/components/dashboard/club/manage/molecules/ClubQnaAnswer";
import ClubQnaQuestionContent from "@/components/dashboard/club/manage/molecules/ClubQnaQuestionContent";

export default function ClubQnaQuestion() {
  return (
    <div className="p-8 rounded-2xl bg-gray-0">
      <ClubQnaQuestionContent />
      <hr className="w-full my-8 border-gray-400" />
      <ClubQnaAnswer />
    </div>
  );
}
