export interface SearchField {
  name: string;
  value: string;
}

export interface SearchFilter {
  name: string | React.ReactNode;
  value: string;
}

export interface SearchOrder {
  name: string;
  value: string;
}

export interface SearchValue {
  field?: string;
  term: string;
  filter?: string;
  order?: string;
}

export interface ChangeSearchValue {
  field?: string;
  term?: string;
  filter?: string;
  order?: string;
}
