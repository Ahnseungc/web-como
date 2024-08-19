import type { SearchValue } from "@/lib/types/search";
import Search from "@/components/dashboard/common/Search";

const fieldList = [
  { name: "동호회명", value: "clubName" },
  { name: "품목", value: "name" },
];

const filterList = [
  { name: "전체 보기", value: "all" },
  { name: "보관", value: "keep" },
  { name: "폐기", value: "dispose" },
];

interface Props {
  currentSearchValue: SearchValue;
  setCurrentSearchValue: React.Dispatch<React.SetStateAction<SearchValue>>;
  handleSearch: () => void;
}

export default function SupplySearch(props: Props) {
  return (
    <Search
      fieldList={fieldList}
      filterList={filterList}
      currentValue={props.currentSearchValue}
      handleChange={({ term, filter, field }) =>
        props.setCurrentSearchValue((prev) => {
          return {
            term: term || prev.term,
            filter: filter || prev.filter,
            field: field || prev.field,
          };
        })
      }
      handleSearch={props.handleSearch}
    />
  );
}
