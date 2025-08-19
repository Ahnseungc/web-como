import { getData } from "@/api/action";

export const getExpenseDetail = async (expenseId: string) => {
  const response = await getData(`v1/manager/activity-expenses/${expenseId}`);
  return response;
};
