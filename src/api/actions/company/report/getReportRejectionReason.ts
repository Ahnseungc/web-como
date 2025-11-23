// import { getAccessToken } from "@/lib/cookies";

// export const getReportRejectionReason = async (reportId: string) => {
//   const token = await getAccessToken();
//   if (!token) throw new Error("토큰 정보가 없습니다.");

//   const url = `/api/server/v1/manager/club/report/${reportId}/rejection-reason`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       accept: "application/json",
//     },
//   });
//   const result = await response.json();
//   return result.data;
// };

import { getData } from "@/lib/client-utils";

export const getReportRejectionReason = async (reportId: string) => {
  const response = await getData(
    `v1/manager/club/report/${reportId}/rejection-reason`
  );
  console.log("123123123", response);
  return response.data;
};
