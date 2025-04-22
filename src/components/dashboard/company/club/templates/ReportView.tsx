"use client";

import { useEffect, useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import ReportSearch from "@/components/dashboard/company/club/molecules/ReportSearch";
import ReportList from "@/components/dashboard/company/club/organisms/ReportList";

export default function ReportView() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    term: "",
    filter: "all",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log(currentSearchValue.filter);
  }, [currentSearchValue.filter]);

  const handleSearch = () => {
    console.log(currentSearchValue.field, currentSearchValue.term);
    setSearchTerm(currentSearchValue.term);
  };

  return (
    <>
      {/* <ReportSearch
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
        handleSearch={handleSearch}
      /> */}
      <ReportList
        // currentSearchFilter={currentSearchValue.filter!}
        // currentSearchTerm={searchTerm}
      />
    </>
  );
}
