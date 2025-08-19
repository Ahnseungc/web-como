import { getData } from "@/api/action";

export const getExpense = async (
  page: number,
  startDate: string,
  endDate: string
) => {
  const response = await getData(
    `v1/manager/activity-expenses?page=${page}&startDate=${startDate}&endDate=${endDate}`
  );
  return response;
};
