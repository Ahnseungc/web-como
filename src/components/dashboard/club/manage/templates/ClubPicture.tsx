import ClubPictureTitle from "@/components/dashboard/club/manage/molecules/ClubPictureTitle";
import ClubPictureItem from "@/components/dashboard/club/manage/organisms/ClubPictureItem";

export interface ClubPicture {
  id: number;
  name: string;
  department: string;
  date: string;
  content: string;
  pictureList: string[];
}

const pictureList: ClubPicture[] = [
  {
    id: 1,
    name: "닉네임",
    department: "부서",
    date: "2024.07.06",
    content: "최고의 스킨 스쿠버였습니다~ 다음번에는 다른분들과 함께해요",
    pictureList: [],
  },
  {
    id: 2,
    name: "닉네임",
    department: "부서",
    date: "2024.07.06",
    content: "최고의 스킨 스쿠버였습니다~ 다음번에는 다른분들과 함께해요",
    pictureList: [],
  },
];

export default function ClubPictureTab() {
  return (
    <>
      <ClubPictureTitle />
      {pictureList.map((picture) => (
        <ClubPictureItem key={picture.id} item={picture} />
      ))}
    </>
  );
}
