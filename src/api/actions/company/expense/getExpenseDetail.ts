// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

export const getExpenseDetail = async (expenseId: string) => {
  const response = await getData(`v1/manager/activity-expenses/${expenseId}`);
  return response;
};
