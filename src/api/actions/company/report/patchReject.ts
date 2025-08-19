import { patchData } from "@/api/action";

export const patchReject = async (reportId: string, reason: string) => {
  const response = await patchData(
    `v1/manager/club/report/${reportId}/reject`,
    {
      reason: reason,
    }
  );
  return response;
};
