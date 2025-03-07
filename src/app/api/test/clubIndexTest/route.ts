import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const obj = {
    category: "ACTIVITY",
    clubImage:
      "https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=51760&fileTy=MEDIA&fileNo=5",
    companyName: "코모컴퍼니",
    detail: "산을 좋아하는 사람들의 모임! 산악동호회입니다",
    goal: "건강한 산악 모임",
    intro: "산을 좋아하는 사람들이 모인 동호회!",
    roadAddress: "서울특별시 중구 세종대로 110 (태평로1가)",
    placeName: "서울시청",
    name: "에너제틱 산악 동호회",
    activityPlanDays: ["월", "화"],
    activityPlanFrequency: "주 2회",
    activityTime: "19:10",
  };

  return NextResponse.json({
    message: "성공",
    data: obj,
  });
}
