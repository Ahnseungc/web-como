export type ExpenseApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ExpenseApplicationEntry {
  id: number;
  clubName: string;
  applicantName: string;
  department: string;
  eventName: string;
  createdDate: number[];
  status: ExpenseApplicationStatus;
}
