// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

export const getReportDetail = async (reportId: string) => {
  const response = await getData(`v1/manager/club/report/${reportId}`);
  return response;
};
