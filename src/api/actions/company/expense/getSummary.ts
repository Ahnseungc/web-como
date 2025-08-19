import { getData } from "@/api/action";

export const getSummary = async () => {
  const response = await getData(`v1/manager/activity-expenses/summary`);
  return response;
};
