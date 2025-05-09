export interface Activity {
  id: number;
  createdAt: string;
  activity: string;
  activityDate: string;
  status: "PENDING" | "REJECTED" | "APPROVED";
  clubName: string;
  eventName: string;
}

export interface ActivityReportPhoto {
  id: number;
  url: string;
}

export interface ActivityReportExpense {
  category: string;
  supportAmount: number;
  usedAmount: number;
  remainingAmount: number;
  usageDetail: string;
  submittedBy: string;
  issuedDate: number[]; // [YYYY, MM, DD]
  vendor: string;
  amount: number;
  description: string;
  file: string;
}

export interface ActivityReportDetail {
  clubImage: string;
  clubName: string;
  writerName: string;
  writerRole: string;
  writerDepartment: string;
  eventName: string;
  activityDate: number[]; // [YYYY, MM, DD]
  activityTime: number[]; // [HH, mm]
  location: string;
  locationDetail: string;
  participantCount: number;
  activityContent: string;
  note: string;
  photos: ActivityReportPhoto[];
  expenses: ActivityReportExpense[];
}
