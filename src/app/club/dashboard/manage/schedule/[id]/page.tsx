import { notFound } from "next/navigation";
import ScheduleDetailCard from "@/components/dashboard/club/schedule/molecues/ScheduleDetail/ScheduleDetailCard";
import ScheduleMemberListCard from "@/components/dashboard/club/schedule/molecues/ScheduleMemberListCard";
import { getData } from "@/api/action";

// Constants
const PAGE_TYPES = {
  REGISTER: "REGISTER",
  DETAIL: "DETAIL",
} as const;

const API_ENDPOINTS = {
  DETAIL: "v1/executive/club/{clubId}/schedule",
  MEMBERS: "v1/executive/club/{clubId}/schedule/{id}/members",
} as const;

// Types
type PageType = (typeof PAGE_TYPES)[keyof typeof PAGE_TYPES];

interface PageProps {
  params: {
    id: string;
    page?: string;
  };
}

// Utility functions
const getPageType = (id: string): PageType => {
  return id === "register" ? PAGE_TYPES.REGISTER : PAGE_TYPES.DETAIL;
};

const fetchScheduleData = async (id: string, page: string) => {
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
}: {
  type: PageType;
  initialData?: any;
  memberList?: any;
}) => (
  <div className="flex flex-col gap-3">
    <ScheduleDetailCard type={type} initialData={initialData} />
    <ScheduleMemberListCard type={type} memberList={memberList} />
  </div>
);

// Main Component
export const dynamic = "force-dynamic";

export default async function ScheduleDetailPage({
  params: { id, page = "1" },
}: PageProps) {
  try {
    const type = getPageType(id);

    if (type === PAGE_TYPES.DETAIL) {
      const { initialData, memberList } = await fetchScheduleData(id, page);
      return (
        <ScheduleContent
          type={type}
          initialData={initialData}
          memberList={memberList}
        />
      );
    }

    return <ScheduleContent type={type} />;
  } catch (error) {
    console.error("Failed to fetch schedule:", error);
    notFound();
  }
}
