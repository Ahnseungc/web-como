export interface RankingData {
  totalClubCount: number;
  rankings: ClubRankingDetail[];
}

interface ClubRankingDetail {
  clubId: number;
  clubName: string;
  memberCount: number;
  rank: number;
}
