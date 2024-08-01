import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "미확인 보고서", value: "unconfirmed" },
  { name: "작성 대기 중", value: "pending" },
];

interface Props {
  currentSearchValue: SearchValue;
  setCurrentSearchValue: React.Dispatch<React.SetStateAction<SearchValue>>;
  handleSearch: () => void;
}

export default function ReportSearch(props: Props) {
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
