import { File } from "@/assets/icons/info";
import Input from "@/components/common/Input";
import Image from "next/image";

interface Photo {
  id: number;
  url: string;
}

interface Expense {
  category: string;
  supportAmount: number;
  usedAmount: number;
  remainingAmount: number;
  usageDetail: string;
  submittedBy: string;
  issuedDate: [number, number, number]; // [year, month, day]
  vendor: string;
  amount: number;
  description: string;
  file: string;
}

interface ClubData {
  clubImage: string;
  clubName: string;
  writerName: string;
  writerRole: string;
  writerDepartment: string;
  eventName: string;
  activityDate: [number, number, number]; // [year, month, day]
  activityTime: [number, number]; // [hour, minute]
  location: string;
  locationDetail: string;
  participantCount: number;
  activityContent: string;
  note: string;
  photos: Photo[];
  expenses: Expense[];
}

interface Props {
  data: ClubData;
}

const expenseType = [
  { name: "활정책사업: 인적자원운용", value: "activity" },
  { name: "단위사업: 교직원 복지와 사기진작", value: "welfare" },
  { name: "세부사업: 교직원복지지원", value: "support" },
  { name: "사업 항목: 직장동호회지원", value: "club" },
  { name: "목(240) : 복리후생비", value: "benefit" },
] as const;

export default function ReportDetail({ data }: Props) {
  if (!data) return;

  const findCategory = (item: string) => {
    const category = expenseType.find((type) => type.value === item);
    return category?.name;
  };

  return (
    <div className=" w-full">
      <div className="space-y-2 p-8 rounded-xl bg-gray-0 w-full">
        {" "}
        <div className="flex gap-4 mb-[36px]">
          <div className=" relative aspect-[1/1] w-[336px]  ">
            {data?.clubImage && (
              <Image
                fill
                src={data.clubImage}
                alt="clubImage"
                className=" rounded-[8px]"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className=" w-full  ">
            <Input
              label="행사명"
              value={data.eventName}
              readOnly
              inputStyle="w-full"
            />
            <div className="flex gap-[12px] mt-[24px]">
              <Input
                label="동호회명"
                inputStyle=" basis-1/2"
                readOnly
                value={data.clubName}
              />
              <Input
                label="작성자"
                inputStyle="basis-1/2"
                readOnly
                value={data.writerName}
              />
            </div>
            <div className="flex w-full gap-[12px] mt-[24px]">
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">활동 일정</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                  {data.activityDate.join("-")}
                </div>
              </div>
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px] text-gray-100">
                  .
                </span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                  {data.activityTime.join(":")}
                </div>
              </div>{" "}
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">활동 장소</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                  {data.location}
                </div>
              </div>{" "}
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px] text-gray-100">
                  ,
                </span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                  {data.locationDetail}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-[8px]">
          <span className="text-xl font-[600]">주요활동 내용</span>
          <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
            {data.activityContent}
          </div>
        </div>
        <div className="flex flex-col w-full gap-[8px] pt-[36px]">
          <span className="text-xl font-[600]">비고</span>
          <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
            {data.note}
          </div>
        </div>
        <div className="flex flex-col w-full gap-[8px] pt-[36px]">
          <span className="text-xl font-[600]">지출 증빙용 활동 사진 첨부</span>
          <div className="flex gap-[12px]">
            {data.photos.map((photo) => {
              return (
                <div key={photo.id} className="w-[374px] aspect-[1/1] relative">
                  <Image
                    src={photo.url}
                    alt="photo"
                    fill
                    className="rounded-[8px]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*활동지원비 정산서 */}
      {data.expenses.map((item, idx) => {
        return (
          <div
            key={idx}
            className="space-y-2 p-8 rounded-xl bg-gray-0 w-full mt-[12px]"
          >
            <div className=" text-2xl font-[700] mb-[36px]">
              활동 지원비 정산서
            </div>
            <div className="flex w-full gap-[12px]">
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">과목</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                  {findCategory(item.category)}
                </div>
              </div>
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">지원액</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                  {item.supportAmount}
                </div>
              </div>{" "}
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">집행액</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                  {item.usedAmount}
                </div>
              </div>{" "}
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px] ">잔액</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                  {item.remainingAmount}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-[8px] pt-[36px]">
              <span className="text-xl font-[600]">집행내역</span>
              <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
                {item.usageDetail}
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
                  {item.submittedBy}
                </div>
              </div>
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px] ">일자</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                  {item.issuedDate.join("-")}
                </div>
              </div>{" "}
            </div>
            <div className="flex w-full gap-[12px]">
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">사용처</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                  {item.vendor}
                </div>
              </div>
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px] ">금액</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                  {item.usedAmount}
                </div>
              </div>{" "}
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px]">내용</span>
                <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                  {item.description}
                </div>
              </div>{" "}
              <div className="flex flex-col basis-1/4">
                <span className=" text-xl font-[600] mb-[8px] ">
                  영수증 첨부
                </span>
                <a
                  href={item.file}
                  download={item.file}
                  target="_blank"
                  className="cursor-pointer flex items-center justify-between text-lg border border-gray-400 rounded-[6px] py-[18px] px-[20px]"
                >
                  영수증.pdf
                  <File />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
