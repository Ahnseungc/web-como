// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

export const getReports = async (
  page: number,
  startDate: string,
  endDate: string
) => {
  const response = await getData(
    `v1/manager/club/report?page=${page - 1}&startDate=${startDate}&endDate=${endDate}`
  );
  return response;
};
