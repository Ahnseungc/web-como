export interface SearchField {
  name: string;
  value: string;
}

export interface SearchFilter {
  name: string | React.ReactNode;
  value: string;
}

export interface SearchValue {
  field?: string;
  term: string;
  filter?: string;
}

export interface ChangeSearchValue {
  field?: string;
  term?: string;
  filter?: string;
}
