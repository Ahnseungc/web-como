// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

export const getRejectionReason = async (expenseId: string) => {
  const response = await getData(
    `v1/manager/activity-expenses/${expenseId}/rejection-reason`,
    false
  );
  return response.data;
};
