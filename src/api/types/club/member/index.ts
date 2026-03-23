export interface MemberListData {
  clubWebMemberDTOS: ClubWebMemberDTO[];
}

export interface ClubWebMemberDTO {
  id: number;
  name: string;
  department: string;
  position: string;
  createdDate: string;
  status: string;
}
