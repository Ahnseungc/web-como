import { notFound } from "next/navigation";
import ScheduleDetailCard from "@/components/dashboard/club/schedule/molecues/ScheduleDetail/ScheduleDetailCard";
import ScheduleMemberListCard from "@/components/dashboard/club/schedule/molecues/ScheduleMemberListCard";
// import { getData } from "@/api/action";
import { getData } from "@/lib/client-utils";

// Constants
const PAGE_TYPES = {
  REGISTER: "REGISTER",
  DETAIL: "DETAIL",
  EDIT: "EDIT",
  MEMBERS: "MEMBERS",
} as const;

const API_ENDPOINTS = {
  DETAIL: "v1/executive/club/{clubId}/schedule",
  MEMBERS: "v1/executive/club/{clubId}/schedule/{id}/members",
} as const;

// Types
export type PageType = (typeof PAGE_TYPES)[keyof typeof PAGE_TYPES];

interface PageProps {
  params: {
    id: string;
    type?: PageType;
    page?: string;
  };
  searchParams: { page?: string };
}

// Utility functions
const getPageType = (id: string): PageType => {
  if (id === "register") return PAGE_TYPES.REGISTER;
  if (id.includes("/edit")) {
    return PAGE_TYPES.EDIT;
  }
  return PAGE_TYPES.DETAIL;
};

export const fetchScheduleData = async (id: string, page: string) => {
  const detailResponse = await getData(`${API_ENDPOINTS.DETAIL}/${id}`, true);
  const memberListResponse = await getData(
    `${API_ENDPOINTS.MEMBERS.replace("{id}", id)}?page=${page}`,
    true
  );

  return {
    initialData: detailResponse.data,
    memberList: memberListResponse.data,
  };
};

// Components
const ScheduleContent = ({
  type,
  initialData,
  memberList,
  scheduleId,
}: {
  type: PageType;
  initialData?: any;
  memberList?: any;
  scheduleId?: number;
}) => (
  <div className="flex flex-col gap-3">
    <ScheduleDetailCard
      scheduleId={scheduleId}
      type={type}
      initialData={initialData}
    />
    <ScheduleMemberListCard type={type} memberList={memberList} />
  </div>
);

// Main Component
export const dynamic = "force-dynamic";

export default async function ScheduleDetailPage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { page?: string };
}) {
  try {
    const pageType = getPageType(id);
    let scheduleId = id;
    const page = searchParams.page || "1";

    if (pageType === PAGE_TYPES.DETAIL || pageType === PAGE_TYPES.EDIT) {
      const { initialData, memberList } = await fetchScheduleData(
        scheduleId,
        page
      );

      return (
        <ScheduleContent
          type={pageType}
          scheduleId={Number(scheduleId)}
          initialData={initialData}
          memberList={memberList}
        />
      );
    }

    return <ScheduleContent type={pageType} />;
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
    notFound();
  }
}
