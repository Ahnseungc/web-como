export interface QnaListData {
  clubWebQuestionInfoDTOS: ClubWebQuestionInfoDTO[];
}

export interface ClubWebQuestionInfoDTO {
  questionId: number;
  questionerId: number;
  questionerNickname: string;
  questionerName: string;
  questionerDepartment: string;
  questionerProfile: string;
  content: string;
  isSecret: string;
  answerId: number;
  createdDate: string;
}