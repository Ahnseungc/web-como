import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const fieldList = [
  { name: "동호회명", value: "club" },
  { name: "부서", value: "dept" },
];
const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "해체신청", value: "request" },
  { name: "활동중", value: "active" },
];

interface Props {
  currentSearchValue: SearchValue;
  setCurrentSearchValue: React.Dispatch<React.SetStateAction<SearchValue>>;
  handleSearch: () => void;
}

export default function ClubSearch(props: Props) {
  return (
    <Search
      fieldList={fieldList}
      filterList={filterList}
      currentValue={props.currentSearchValue}
      handleChange={({ field, term, filter }) =>
        props.setCurrentSearchValue((prev) => {
          return {
            field: field || prev.field,
            term: term || prev.term,
            filter: filter || prev.filter,
          };
        })
      }
      handleSearch={props.handleSearch}
    />
  );
}
