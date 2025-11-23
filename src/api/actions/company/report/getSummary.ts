// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

export const getSummary = async () => {
  const response = await getData(`v1/manager/club/report/summary`);
  return response;
};
