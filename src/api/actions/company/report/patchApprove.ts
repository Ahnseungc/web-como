import { patchData } from "@/api/action";

export const patchApprove = async (reportId: string) => {
  const response = await patchData(
    `v1/manager/club/report/${reportId}/approve`,
    undefined,
    false
  );
  return response;
};
