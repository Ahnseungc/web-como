import { getData } from "@/api/action";

export const getReportRejectionReason = async (reportId: string) => {
  const response = await getData(
    `v1/manager/club/report/${reportId}/rejection-reason`
  );
  return response;
};
