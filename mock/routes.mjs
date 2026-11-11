// 화면별 목 응답. 인물·회사·동호회는 모두 가상 데이터.
const NAMES = ["김하늘", "이도윤", "박서연", "최민준", "정예린", "강지호", "윤채원", "임태오", "한소율", "오지안", "서도현", "신유나"];
const DEPTS = ["교육정책과", "디지털교육과", "총무과", "인사과", "학생지원과", "예산과", "평생교육과"];
const POSITIONS = ["주무관", "사무관", "서기관", "주무관", "주무관", "팀장"];
const CLUBS = [
  { name: "러닝크루 오모", category: "액티비티" },
  { name: "주말 클라이밍", category: "액티비티" },
  { name: "필름카메라 산책", category: "크리에이티브" },
  { name: "점심 독서모임", category: "스터디" },
  { name: "홈베이킹 클럽", category: "F&B" },
  { name: "보드게임 나잇", category: "네트워킹" },
  { name: "우쿨렐레 합주반", category: "문화/예술" },
  { name: "풋살 FC", category: "액티비티" },
];
const EVENTS = ["한강 10K 정기런", "11월 정기 모임", "신입 회원 환영회", "북한산 야간 산행", "연말 홈파티", "클라이밍 원데이 클래스", "필름 사진 전시회", "독서 토론: 사피엔스"];
const STATUSES = ["APPROVED", "APPROVED", "PENDING", "APPROVED", "REJECTED", "APPROVED", "PENDING", "APPROVED"];

const pick = (arr, i) => arr[i % arr.length];
const day = (offset) => {
  const d = new Date("2026-11-11T10:00:00+09:00");
  d.setDate(d.getDate() + offset);
  return d;
};
const iso = (offset) => day(offset).toISOString().slice(0, 19);
const ymd = (offset) => iso(offset).slice(0, 10);
const arr = (offset) => {
  const d = day(offset);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate(), 10, 30, 0];
};
const page = (list) => ({ list, currentPage: 1, totalPages: 3, totalElements: list.length * 3 });

const members = NAMES.map((name, i) => ({
  id: 120 - i,
  name,
  department: pick(DEPTS, i),
  position: pick(POSITIONS, i),
  createdDate: iso(-i * 9 - 2),
  createAt: iso(-i * 17 - 30),
  status: i === 3 ? "PENDING" : i === 9 ? "SIGNOUT" : "APPROVED",
}));

export const routes = {
  // 공통 헤더
  "v1/manager/member/my-profile": {
    name: "안승찬",
    profileImage: null,
    companyName: "(주)오모컴퍼니",
    departmentName: "(주)오모컴퍼니",
  },
  "v1/club/my": CLUBS.slice(0, 3).map((c, i) => ({ id: i + 1, name: c.name })),
  "v1/club/:id": { id: 1, name: CLUBS[0].name, category: CLUBS[0].category, memberCount: 42 },

  // 동호회 관리자
  "v1/executive/club/:id/dashboard/notifications": {
    clubName: CLUBS[0].name,
    newJoinRequests: 6,
    recentManagerNotices: 2,
    recentOmoNotices: 3,
  },
  "v1/executive/club/:id/dashboard/activity/upcoming": EVENTS.slice(0, 5).map((title, i) => ({
    id: i + 1,
    createdDate: iso(i * 3 + 1),
    title,
    memberCount: [18, 12, 25, 9, 30][i],
    detail: ["여의도 한강공원 물빛광장 19:30", "사무실 3층 라운지", "을지로 펍 '오모'", "북한산성 탐방지원센터", "회원 집들이"][i],
  })),
  "v1/executive/club/:id/member/list": page(members.slice(0, 10)),
  "v1/executive/club/:id/reports/summary": { pendingCount: 4, rejectedCount: 1, approvedCount: 17 },
  "v1/executive/club/:id/activity-expenses/summary": { approvedCount: 12, rejectedCount: 1 },
  "v1/executive/club/:id/reports": page(
    EVENTS.map((eventName, i) => ({
      id: 40 - i,
      eventName,
      activityDate: ymd(-i * 6 - 1),
      status: pick(STATUSES, i),
      rejectionReason: pick(STATUSES, i) === "REJECTED" ? "영수증 사진이 누락되었습니다." : undefined,
    }))
  ),
  "v1/executive/club/:id/activity-expenses": page(
    EVENTS.map((eventName, i) => ({
      id: 30 - i,
      createdDate: iso(-i * 5 - 1),
      writerName: pick(NAMES, i),
      eventName,
      clubName: CLUBS[0].name,
      status: pick(STATUSES, i + 1),
      rejectReason: pick(STATUSES, i + 1) === "REJECTED" ? "지원 한도 초과" : null,
    }))
  ),
  "v1/executive/club/:id/schedule/existence": {
    List: EVENTS.map((title, i) => ({ id: 20 - i, title, createdDate: iso(-i * 4) })),
    currentPage: 1,
    maxPage: 2,
  },

  // 기업 담당자
  "v1/manager/member/dashboard": { count: 1284 },
  "v1/manager/club/pending-count": 3,
  "v1/manager/club/approved-count": 24,
  "v1/manager/club": page(
    CLUBS.map((c, i) => ({
      clubId: 8 - i,
      applicantId: 100 + i,
      applicantName: pick(NAMES, i + 2),
      department: pick(DEPTS, i),
      clubName: c.name,
      appliedDate: arr(-i * 21 - 3),
      status: "APPROVED",
    }))
  ),
  "v1/manager/club/report/summary": { pendingCount: 7, approvedCount: 58, rejectedCount: 4 },
  "v1/manager/club/report": page(
    EVENTS.map((eventName, i) => ({
      id: 90 - i,
      createdAt: iso(-i * 3 - 1),
      activity: eventName,
      activityDate: ymd(-i * 3 - 2),
      status: pick(STATUSES, i + 2),
      clubName: pick(CLUBS, i).name,
      eventName,
    }))
  ),
  "v1/manager/activity-expense/summary": { pendingCount: 5, approvedCount: 41, rejectedCount: 2 },
  "v1/manager/activity-expenses": page(
    EVENTS.map((eventName, i) => ({
      id: 70 - i,
      clubName: pick(CLUBS, i).name,
      writerName: pick(NAMES, i + 4),
      department: pick(DEPTS, i + 1),
      eventName,
      createdDate: iso(-i * 4 - 1),
      status: pick(STATUSES, i + 3),
    }))
  ),
  "v1/manager/member/list": page(members.slice(0, 10).map((m) => ({ ...m, status: m.status === "SIGNOUT" ? "INACTIVE" : "ACTIVE" }))),
};
