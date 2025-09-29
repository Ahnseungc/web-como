import { ActivityReportDetail } from "@/api/types/company/report";
import Input from "@/components/common/Input";
import { formatDateArray, formatDateFlexible } from "@/lib/utils";
import Image from "next/image";

interface Props {
  data: {
    data: ActivityReportDetail;
    resultCode: string;
    resultMessage: string;
  };
}

const expenseCategory = {
  activity: "정책사업: 인적자원운용",
  welfare: "단위사업: 교직원 복지와 사기진작",
  support: "세부사업: 교직원복지지원",
  club: "사업 항목: 직장동호회지원",
  benefit: "목(240) : 복리후생비",
};

export default function ReportDetail({ data }: Props) {
  const reportData = data?.data;

  // 디버깅을 위한 로그 추가
  console.log("ReportDetail data:", data);
  console.log("activityTime:", reportData?.activityTime);
  console.log("activityTime type:", typeof reportData?.activityTime);
  console.log("activityTime isArray:", Array.isArray(reportData?.activityTime));

  return (
    <div className="w-full">
      {/* 1페이지: 활동 사진 첨부까지 */}
      <div className="space-y-2 p-8 rounded-xl bg-gray-0 w-full print-page-break-after">
        {" "}
        <div className="flex gap-4 mb-[36px]">
          <div className="relative aspect-[1/1] min-w-[336px]">
            {reportData?.clubImage && (
              <Image
                fill
                src={reportData.clubImage}
                alt="clubImage"
                className="rounded-[8px]"
              />
            )}
          </div>
          <div className=" w-full  ">
            {reportData?.eventName ? (
              <Input
                label="행사명"
                value={reportData.eventName}
                readOnly
                inputStyle="w-full"
              />
            ) : (
              <div className="w-full">
                <span className="text-xl font-[600] mb-[8px] block">
                  행사명
                </span>
                <div className="text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] text-gray-400">
                  행사명 정보를 불러올 수 없습니다.
                </div>
              </div>
            )}
            <div className="flex gap-[12px] mt-[24px]">
              <Input
                label="동호회명"
                inputStyle=" basis-1/2"
                readOnly
                value={reportData?.clubName || ""}
              />
              <Input
                label="작성자"
                inputStyle="basis-1/2"
                readOnly
                value={reportData?.writerName || ""}
              />
            </div>
            <div className="flex w-full gap-[12px] mt-[24px]">
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">활동 일정</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                  {reportData?.activityDate
                    ? formatDateFlexible(reportData.activityDate)
                    : "-"}
                </div>
              </div>
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px] text-gray-100">
                  .
                </span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                  {Array.isArray(reportData?.activityTime) &&
                  reportData.activityTime.length >= 2
                    ? `${String(reportData.activityTime[0]).padStart(2, "0")}:${String(reportData.activityTime[1]).padStart(2, "0")}`
                    : "-"}
                </div>
              </div>{" "}
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">활동 장소</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                  {reportData?.location || "-"}
                </div>
              </div>{" "}
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px] text-gray-100">
                  ,
                </span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                  {reportData?.locationDetail || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-[8px]">
          <span className="text-xl font-[600]">주요활동 내용</span>
          <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
            {reportData?.activityContent || "-"}
          </div>
        </div>
        <div className="flex flex-col w-full gap-[8px] pt-[36px]">
          <span className="text-xl font-[600]">비고</span>
          <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
            {reportData?.note || "-"}
          </div>
        </div>
        <div className="flex flex-col w-full gap-[8px] pt-[36px]">
          <span className="text-xl font-[600]">지출 증빙용 활동 사진 첨부</span>
          <div className="grid grid-cols-2 gap-[12px] w-full">
            {reportData?.photos &&
              reportData.photos.map((photo) => (
                <div key={photo.id} className="aspect-[1/1] relative w-full">
                  <Image
                    src={photo.url}
                    alt="photo"
                    fill
                    className="rounded-[8px] object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* 2페이지: 활동 지원비 정산서부터 */}
      {reportData?.expenses && reportData.expenses.length > 0 ? (
        reportData.expenses.map((item, idx) => {
          return (
            <div
              key={idx}
              className="space-y-2 p-8 rounded-xl bg-gray-0 w-full mt-[12px] mb-[100px]"
            >
              <div className=" text-2xl font-[700] mb-[36px]">
                활동 지원비 정산서
              </div>
              <div className="flex w-full gap-[12px]">
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px]">과목</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                    {
                      expenseCategory[
                        item.category as keyof typeof expenseCategory
                      ]
                    }
                  </div>
                </div>
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px]">지원액</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                    {item.supportAmount || "-"}
                  </div>
                </div>{" "}
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px]">집행액</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                    {item.usedAmount || "-"}
                  </div>
                </div>{" "}
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px] ">잔액</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                    {item.remainingAmount || "-"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-[8px] pt-[36px]">
                <span className="text-xl font-[600]">집행내역</span>
                <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
                  {item.usageDetail || "-"}
                </div>
              </div>

              {/*활동 지원비 영수증 */}

              <div className=" text-2xl font-[700] pt-[36px] pb-[24px]">
                활동 지원비 영수증
              </div>
              <div className="flex w-full gap-[12px] pb-[24px]">
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px]">담당자</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                    {item.submittedBy || "-"}
                  </div>
                </div>
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px] ">일자</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                    {item.issuedDate?.join("-") || "-"}
                  </div>
                </div>{" "}
              </div>
              <div className="flex w-full gap-[12px]">
                <div className="flex flex-col basis-1/2">
                  <span className=" text-xl font-[600] mb-[8px]">사용처</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                    {item.vendor || "-"}
                  </div>
                </div>
                <div className="flex flex-col basis-1/2">
                  <span className=" text-xl font-[600] mb-[8px] ">금액</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                    {item.usedAmount || "-"}
                  </div>
                </div>{" "}
              </div>
              <div className="flex w-full gap-[12px] flex-col">
                <div className="flex flex-col basis-1">
                  <span className=" text-xl font-[600] mb-[8px]">내용</span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                    {item.description || "-"}
                  </div>
                </div>{" "}
                <div className="flex flex-col basis-1">
                  <span className=" text-xl font-[600] mb-[8px] ">영수증</span>
                  <div className="grid grid-cols-2 gap-[12px] w-full">
                    {item.file && (
                      <div className="aspect-[760/1013] relative min-w-full">
                        <Image
                          src={item.file}
                          alt="photo"
                          fill
                          className="rounded-[8px] object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="space-y-2 p-8 rounded-xl bg-gray-0 w-full mt-[12px] mb-[100px]">
          <div className="text-2xl font-[700] mb-[36px]">
            활동 지원비 정산서
          </div>
          <div className="text-lg text-gray-500 text-center py-8">
            활동 지원비 내역이 없습니다.
          </div>
        </div>
      )}
    </div>
  );
}
