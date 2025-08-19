import { getData } from "@/api/action";

export const getReportDetail = async (reportId: string) => {
  const response = await getData(`v1/manager/club/report/${reportId}`);
  return response;
};
