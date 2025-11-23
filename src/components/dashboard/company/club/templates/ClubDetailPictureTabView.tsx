// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";
import {
  ClubWebActivityInfoDTO,
  ClubWebActivityPictureInfoDTO,
} from "@/api/types/club/activity";
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
    queryFn: () => getData(`v1/manager/club/${clubId}/activity-feed`, false),
  });

  if (!data) return;
  console.log(data);
  console.log("data.data", data.data);

  const pictureData = data.data as ClubWebActivityInfoDTO[];

  console.log("pictureData", pictureData);

  return (
    <>
      {/* <ClubTitle /> */}
      {pictureData?.map((picture: ClubWebActivityInfoDTO) => (
        <ClubPictureDetailItem key={picture.id} item={picture} readonly />
      ))}
    </>
  );
}
