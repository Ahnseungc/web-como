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
