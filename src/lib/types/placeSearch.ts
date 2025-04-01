export type PlaceSearchResultType = {
  display: number;
  items: PlaceSearchItemType[];
  lastBuildDate: string;
  start: number;
  total: number;
};

export type PlaceSearchItemType = {
  address: string;
  category: string;
  description: string;
  link: string;
  mapx: string;
  mapy: string;
  roadAddress: string;
  telephone: string;
  title: string;
};
