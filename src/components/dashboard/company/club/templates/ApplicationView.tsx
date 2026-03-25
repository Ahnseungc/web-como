"use client";

import { useEffect, useState } from "react";
import type { SearchValue } from "@/lib/types/search";
// import ApplicationSearch from "@/components/dashboard/company/club/molecules/ApplicationSearch";
import ApplicationList from "@/components/dashboard/company/club/organisms/ApplicationList";

export default function ApplicationView() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    term: "",
    filter: "all",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // console.log(currentSearchValue.filter);
  }, [currentSearchValue.filter]);

  const handleSearch = () => {
    console.log(currentSearchValue.term);
    setSearchTerm(currentSearchValue.term);
  };

  return (
    <>
      {/* <ApplicationSearch
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
        handleSearch={handleSearch}
      /> */}
      <ApplicationList
        currentSearchFilter={currentSearchValue.filter!}
        currentSearchTerm={searchTerm}
      />
    </>
  );
}
