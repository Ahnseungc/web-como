// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

export const getRejectionReason = async (expenseId: string) => {
  const response = await getData(
    `v1/manager/activity-expense/${expenseId}/rejection-reason`,
    false
  );
  return response.data;
};
