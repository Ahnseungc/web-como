import { getData } from "@/api/action";

export const getReports = async (
  page: number,
  startDate: string,
  endDate: string
) => {
  const response = await getData(
    `v1/manager/club/report?page=${page}&startDate=${startDate}&endDate=${endDate}`
  );
  return response;
};
