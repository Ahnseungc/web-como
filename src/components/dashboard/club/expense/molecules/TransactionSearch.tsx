// "use client";

// import { useState } from "react";
// import type { SearchValue } from "@/lib/types/search";
// import Search from "@/components/dashboard/common/Search";

// const filterList = [
//   { name: "전체 보기", value: "all" },
//   { name: "입금", value: "deposit" },
//   { name: "출금", value: "withdrawal" },
// ];

// export default function TransactionSearch() {
//   const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
//     term: "",
//     filter: "all",
//   });

//   const handleSearch = () => {};

//   return (
//     <Search
//       filterList={filterList}
//       currentValue={currentSearchValue}
//       handleChange={({ term, filter }) =>
//         setCurrentSearchValue((prev) => {
//           return { term: term || prev.term, filter: filter || prev.filter };
//         })
//       }
//       handleSearch={handleSearch}
//     />
//   );
// }
