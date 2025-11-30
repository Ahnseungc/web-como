// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

export const getExpense = async (
  page: number,
  startDate: string,
  endDate: string
) => {
  const response = await getData(
    `v1/manager/activity-expenses?page=${page - 1}&startDate=${startDate}&endDate=${endDate}`
  );
  return response;
};
