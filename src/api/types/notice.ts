export interface Notice {
  noticeId: number;
  title: string;
  name: string;
  createdDate: number[];
  viewCount: number;
  isPinned: "Y" | "N";
}

export interface NoticeListResponse {
  data: {
    noticeList: Notice[];
    currentPage: number;
    maxPage: number;
  };
  resultCode: string;
  resultMessage: string;
}
