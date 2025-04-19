import { CATEGORY } from "@/lib/types/enum";

export interface ClubIndexData {
  clubImage: string;
  clubName: string;
  companyName: string;
  category: keyof typeof CATEGORY;
  goal: string;
  detail: string;
  activityPlan: string;
  latitude: string;
  longitude: string;
  location: string;
  intro: string;
}
