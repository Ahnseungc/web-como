import { getData } from "@/api/action";
import { ClubWebActivityPictureInfoDTO } from "@/api/types/club/activity";
import ClubTitle from "@/components/dashboard/shared/molecules/ClubTitle";
import ClubPictureDetailItem from "@/components/dashboard/shared/organisms/ClubPictureDetailItem";
import ClubPictureItem from "@/components/dashboard/shared/organisms/ClubPictureItem";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export default function ClubDetailPictureTabView() {
  const pathname = usePathname();
  const clubId = pathname.split("/").pop();

  const { data } = useQuery({
    queryKey: [clubId],
    queryFn: () => getData(`v2/club/web/activity/${clubId}`, false),
  });

  if (!data) return;

  const pictureData = data.data
    .clubWebActivityInfoDTOS as ClubWebActivityPictureInfoDTO[];

  console.log(pictureData);

  return (
    <>
      <ClubTitle />
      {pictureData.map((picture: ClubWebActivityPictureInfoDTO) => (
        <ClubPictureDetailItem key={picture.id} item={picture} readonly />
      ))}
    </>
  );
}
