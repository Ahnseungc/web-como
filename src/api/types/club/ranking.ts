export interface RankingData {
  totalClubCount: number;
  myClubRanking: number;
  clubRankingDetails: ClubRankingDetail[];
}

interface ClubRankingDetail {
  clubId: number;
  clubName: string;
  ranking: number;
  clubMember: number;
}