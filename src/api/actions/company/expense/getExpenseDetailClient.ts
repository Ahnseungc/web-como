// import { getAccessToken } from "@/lib/cookies";

// export const getExpenseDetailClient = async (expenseId: string) => {
//   const token = await getAccessToken();
//   if (!token) throw new Error("토큰 정보가 없습니다.");

//   const url = `/api/v1/manager/activity-expenses/${expenseId}`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       accept: "application/json",
//     },
//   });
//   return response.json();
// };

import { getData } from "@/lib/client-utils";

export const getExpenseDetailClient = async (expenseId: string) => {
  const response = await getData(`v1/manager/activity-expenses/${expenseId}`);
  return response;
};
