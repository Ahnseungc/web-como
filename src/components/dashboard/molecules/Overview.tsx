import Link from "next/link";

export default function DashboardOverview() {
  return (
    <div className="col-span-4 flex flex-col gap-6 h-fit p-8 rounded-xl bg-gray-800">
      <h3 className="h1 font-bold text-gray-0">{"동호회 이름 주요 알림"}</h3>
      <div className="flex gap-8">
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"신규 동호회 신청 건수"}
          </span>
          <Link href={"/dashboard"}>
            <span className="h1 font-extrabold text-brand-orange underline underline-offset-4 decoration-gray-800 hover:decoration-brand-orange transition duration-300">
              {`${0}건`}
            </span>
          </Link>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"동호회 문의 접수"}
          </span>
          <Link href={"/dashboard"}>
            <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">{`${0}건`}</span>
          </Link>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"읽지 않은 인사 공지사항"}
          </span>
          <Link href={"/dashboard"}>
            <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">{`${0}건`}</span>
          </Link>
        </div>
        <span className="h-[104px] border-l border-gray-700" />
        <div className="flex-1 flex flex-col gap-4 py-3 px-2">
          <span className="h4 font-medium text-gray-400">
            {"읽지 않은 omo 공지사항"}
          </span>
          <Link href={"/dashboard"}>
            <span className="h1 font-extrabold text-gray-0 underline underline-offset-4 decoration-gray-800 hover:decoration-gray-0 transition duration-300">{`${0}건`}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
