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
  clubCategory: z.string(),
  detail: z
    .string()
    .max(300, { message: "상세 소개는 최대 300자까지 가능합니다" }),
  goal: z.string(),
  intro: z
    .string()
    .max(18, { message: "한줄 소개는 최대 18자까지 가능합니다" }),
  roadAddress: z.string(),
  placeName: z.string(),
  name: z.string(),
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
  clubCategory: "",
  detail: "",
  goal: "",
  intro: "",
  roadAddress: "",
  placeName: "",
  name: "",
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
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  date: z.date(),
  time: z.string().min(1, { message: "시간을 입력해주세요." }),
  recruitStartDate: z
    .string()
    .min(1, { message: "모집 시작일을 입력해주세요." }),
  recruitEndDate: z.string().min(1, { message: "모집 종료일을 입력해주세요." }),
});

export type ScheduleRegisterSchemaType = z.infer<typeof ScheduleRegisterSchema>;

// export const ExpenseSchema = z.object({
//   category: z.string().min(1, { message: "카테고리를 입력해주세요." }),
//   supportAmount: z.union([
//     z.number().min(1, { message: "지원금액을 입력해주세요." }),
//     z.string().refine((val) => val === "" || Number(val) >= 0, {
//       message: "지원금액을 입력해주세요.",
//     }),
//   ]),
//   usedAmount: z.union([
//     z.number().min(1, { message: "사용금액을 입력해주세요." }),
//     z.string().refine((val) => val === "" || Number(val) >= 0, {
//       message: "사용금액을 입력해주세요.",
//     }),
//   ]),
//   remainingAmount: z.union([
//     z.number().min(1, { message: "잔액을 입력해주세요." }),
//     z.string().refine((val) => val === "" || Number(val) >= 0, {
//       message: "잔액을 입력해주세요.",
//     }),
//   ]),
//   usageDetail: z.string().min(1, { message: "사용내역을 입력해주세요." }),
//   submittedBy: z.string().min(1, { message: "제출자를 입력해주세요." }),
//   issuedDate: z.date(), // ISO date string
//   vendor: z.string().min(1, { message: "거래처를 입력해주세요." }),
//   amount: z.union([
//     z.number().min(1, { message: "금액을 입력해주세요." }),
//     z.string().refine((val) => val === "" || Number(val) >= 0, {
//       message: "금액을 입력해주세요.",
//     }),
//   ]),
//   description: z.string().min(1, { message: "설명을 입력해주세요." }),
//   // file: z.string().optional(),
// });
export const ExpenseSchema = z.object({
  category: z.string().min(1, { message: "카테고리를 입력해주세요." }),
  supportAmount: z
    .string()
    .min(1, { message: "지원금액을 입력해주세요." })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "지원금액을 입력해주세요.",
    }),
  usedAmount: z
    .string()
    .min(1, { message: "사용금액을 입력해주세요." })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "사용금액을 입력해주세요.",
    }),
  remainingAmount: z
    .string()
    .min(1, { message: "잔액을 입력해주세요." })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "잔액을 입력해주세요.",
    }),
  usageDetail: z.string().min(1, { message: "사용내역을 입력해주세요." }),
  submittedBy: z.string().min(1, { message: "제출자를 입력해주세요." }),
  issuedDate: z.date(),
  vendor: z.string().min(1, { message: "거래처를 입력해주세요." }),
  amount: z
    .string()
    .min(1, { message: "금액을 입력해주세요." })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "금액을 입력해주세요.",
    }),
  description: z.string().min(1, { message: "설명을 입력해주세요." }),
});

export const ActivityFormSchema = z.object({
  eventName: z.string().min(1, { message: "행사명을 입력해주세요." }),
  activityDate: z.date(), // ISO date string
  activityTime: z.string().min(1, { message: "시간을 입력해주세요." }),
  location: z.string().min(1, { message: "장소를 입력해주세요." }),
  locationDetail: z.string().min(1, { message: "장소 상세를 입력해주세요." }),
  participantCount: z.number().min(1, { message: "참가자 수를 입력해주세요." }),
  activityContent: z.string().min(1, { message: "행사 내용을 입력해주세요." }),
  note: z.string().optional(),
  // photos: z.array(z.string()).optional(),
  expenses: z.array(ExpenseSchema),
});

export const ResultReportSchema = z.object({
  data: ActivityFormSchema,
  photos: z
    .array(z.any())
    .min(1, { message: "사진을 최소 1개 이상 첨부해주세요." }),
  receipts: z
    .array(z.any())
    .min(1, { message: "영수증을 최소 1개 이상 첨부해주세요." }),
});

export type ResultReportSchemaType = z.infer<typeof ResultReportSchema>;
