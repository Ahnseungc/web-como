export type ExpenseApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ExpenseApplicationEntry {
  id: number;
  clubName: string;
  writerName: string;
  department: string;
  eventName: string;
  createdDate: string | number[];
  status: ExpenseApplicationStatus;
}

export type ExpenseFormValues = {
  eventName: string;
  description: string;
  content: string;
  location: string;
  participantCount: number;
  amount: number;
  details: string;
  file: string | null;
};

export type CardInfo = {
  clubId: number;
  clubImage: string;
  leadersSummary: string;
  activityPlan: string;
  memberCount: number;
  status: ExpenseApplicationStatus;
  createdAt: number[];
  clubName: string;
};

export type ExpenseDetail = CardInfo & ExpenseFormValues;
