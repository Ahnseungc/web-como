export interface ActivityPictureData {
  clubWebActivityInfoDTOS: ClubWebActivityInfoDTO[];
}

export interface ClubWebActivityInfoDTO {
  activityImages: string[];
  nickName: string;
  profile: string;
  department: string;
  createDate: string;
  id: number;
  content: string;
}
