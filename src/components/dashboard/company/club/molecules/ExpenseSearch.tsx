import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "지급 대기", value: "pending" },
  { name: "지급 완료", value: "completed" },
  { name: "반려", value: "rejected" },
];

interface Props {
  currentSearchValue: SearchValue;
  setCurrentSearchValue: React.Dispatch<React.SetStateAction<SearchValue>>;
  handleSearch: () => void;
}

export default function ExpenseSearch(props: Props) {
  return (
    <Search
      filterList={filterList}
      currentValue={props.currentSearchValue}
      handleChange={({ term, filter }) =>
        props.setCurrentSearchValue((prev) => {
          return {
            term: term || prev.term,
            filter: filter || prev.filter,
          };
        })
      }
      handleSearch={props.handleSearch}
    />
  );
}
