export interface UpcomingActivityData {
  count: number;
  contents: UpcomingClubActivityList[];
} 

interface UpcomingClubActivityList {
  date: string;
  order: number;
  activityName: string;
  memberCount: number;
  detail: string;
}
