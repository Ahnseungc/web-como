export interface MemberListData {
  clubWebMemberDTOS: ClubWebMemberDTO[];
}

export interface ClubWebMemberDTO {
  id: number;
  name: string;
  department: string;
  position: string;
  requestDate: string;
  status: string;
}
