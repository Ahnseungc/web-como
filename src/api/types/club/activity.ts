export interface ActivityPictureData {
  clubWebActivityInfoDTOS: ClubWebActivityInfoDTO[];
}

export interface ClubWebActivityInfoDTO {
  id: number;
  writerNickname: string;
  writerDepartment: string;
  writerProfileImage: string;
  content: string;
  date: string;
  photos: string[];
}

export interface ClubWebActivityPictureData {
  ClubWebActivityPictureInfoDTOS: ClubWebActivityPictureInfoDTO[];
}

export interface ClubWebActivityPictureInfoDTO {
  activityImages: string[];
  content: string;
  createDate: string;
  department: string;
  id: number;
  nickName: string;
  profile: string;
}
