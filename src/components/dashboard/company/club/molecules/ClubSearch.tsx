import type { SearchValueWithFilter } from "@/lib/types/search";
import SearchBarWithFilterChips from "@/components/dashboard/common/SearchBarWithFilterChips";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "해체신청", value: "request" },
  { name: "활동중", value: "active" },
];

interface Props {
  currentSearchValue: SearchValueWithFilter;
  setCurrentSearchValue: React.Dispatch<
    React.SetStateAction<SearchValueWithFilter>
  >;
  handleSearch: () => void;
}

export default function ClubSearch(props: Props) {
  return (
    <SearchBarWithFilterChips
      filterList={filterList}
      currentValue={props.currentSearchValue}
      handleChange={({ term, filter }) =>
        props.setCurrentSearchValue((prev) => {
          return { term: term || prev.term, filter: filter || prev.filter };
        })
      }
      handleSearch={props.handleSearch}
    />
  );
}
