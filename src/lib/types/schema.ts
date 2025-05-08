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

// 동호회 일정 등록 스키마
export const ScheduleRegisterSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  description: z.string().min(1, { message: "설명을 입력해주세요." }),
  location: z.object({
    roadAddress: z.string().min(1, { message: "주소를 입력해주세요." }),
    placeName: z.string().min(1, { message: "장소명을 입력해주세요." }),
  }),
  date: z.date(),
  time: z.string().min(1, { message: "시간을 입력해주세요." }),
});

export type ScheduleRegisterSchemaType = z.infer<typeof ScheduleRegisterSchema>;

export const ExpenseSchema = z.object({
  category: z.string(),
  supportAmount: z.number().or(z.string()),
  usedAmount: z.number().or(z.string()),
  remainingAmount: z.number().or(z.string()),
  usageDetail: z.string(),
  submittedBy: z.string(),
  issuedDate: z.date(), // ISO date string
  vendor: z.string(),
  amount: z.number().or(z.string()),
  description: z.string(),
  // file: z.string().optional(),
});

export const ActivityFormSchema = z.object({
  eventName: z.string(),
  activityDate: z.date(), // ISO date string
  activityTime: z.string().min(1, { message: "시간을 입력해주세요." }),
  location: z.string(),
  locationDetail: z.string(),
  participantCount: z.number(),
  activityContent: z.string(),
  note: z.string().optional(),
  // photos: z.array(z.string()).optional(),
  expenses: z.array(ExpenseSchema),
});

export const ResultReportSchema = z.object({
  data: ActivityFormSchema,
  photos: z.array(z.any()),
  receipts: z.array(z.any()),
});

export type ResultReportSchemaType = z.infer<typeof ResultReportSchema>;
