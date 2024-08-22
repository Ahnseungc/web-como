export interface MemberListData {
  clubWebMemberDTOS: ClubWebMemberDTO[];
}

export interface ClubWebMemberDTO {
  name: string;
  department: string;
  answer: string;
  createDate: string;
  processStatus: string;
}