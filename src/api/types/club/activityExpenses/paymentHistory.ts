export interface ExpenseListData {
  clubActivityExpensePaymentHistories: ClubActivityExpensePaymentHistory[];
}

export interface ClubActivityExpensePaymentHistory {
  id: number;
  createdDate: string;
  applicant: string;
  expenseReportDetail: string;
  category: string;
  personInCharge: string;
  receipt: string;
}