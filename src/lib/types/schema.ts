import { z } from "zod";

// 인증 스키마
export const IdentificationSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z.string().min(1, { message: "이메일 주소를 입력해주세요." }),
  phone: z.string().min(1, { message: "전화번호를 입력해주세요." }),
});

export type IdentificationSchemaType = z.infer<typeof IdentificationSchema>;

export const identificationSchemaDefaultValues: IdentificationSchemaType = {
  name: "",
  email: "",
  phone: "",
};

// 동호회 정보 스키마
export const ClubIndexSchema = z.object({
  activityPlanDays: z.array(z.string()),
  activityPlanFrequency: z.string(),
  activityTime: z.string(),
  clubImage: z.union([
    z.string().url({ message: "유효한 이미지 URL이 아닙니다" }),
    z
      .instanceof(File, { message: "파일 형식이 아닙니다" })
      .refine((file) => file.type.startsWith("image/"), {
        message: "이미지 파일만 업로드 가능합니다",
      }),
  ]),
  companyName: z.string().min(1, { message: "소속 기업명은 필수값입니다" }),
  category: z.string(),
  detail: z
    .string()
    .max(300, { message: "상세 소개는 최대 300자까지 가능합니다" }),
  goal: z.string(),
  intro: z
    .string()
    .max(18, { message: "한줄 소개는 최대 18자까지 가능합니다" }),
  roadAddress: z.string(),
  placeName: z.string(),
  clubName: z.string(),
  location: z.string(),
  activityPlan: z.string(),
});

export type ClubIndexSchemaType = z.infer<typeof ClubIndexSchema>;

export const ClubIndexDefaultValues: ClubIndexSchemaType = {
  activityPlanDays: [],
  activityPlanFrequency: "",
  activityTime: "",
  clubImage: "",
  companyName: "",
  category: "",
  detail: "",
  goal: "",
  intro: "",
  roadAddress: "",
  placeName: "",
  clubName: "",
  location: "",
  activityPlan: "",
};
