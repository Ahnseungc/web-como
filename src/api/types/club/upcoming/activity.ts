export interface UpcomingActivityData {
  upcomingClubActivityLists: UpcomingClubActivityList[];
}

interface UpcomingClubActivityList {
  date: string;
  order: number;
  activityName: string;
  memberCount: number;
  detail: string;
}