import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const obj = {
    category: "",
    clubImage:
      "",
    companyName: "",
    detail: "",
    goal: "",
    intro: "",
    roadAddress: "",
    placeName: "",
    name: "",
    activityPlanDays: ["월", "화"],
    activityPlanFrequency: "주 2회",
    activityTime: "19:10",
  };

  return NextResponse.json({
    message: "성공",
    data: obj,
  });
}