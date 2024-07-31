export interface SearchFilter {
  name: string | React.ReactNode;
  value: string;
}

export const initialSearchValueWithFilter: SearchValueWithFilter = {
  term: "",
  filter: "all",
};

export interface SearchValueWithFilter {
  term: string;
  filter: string;
}

export interface ChangeSearchValueWithFilter {
  term?: string;
  filter?: string;
}
