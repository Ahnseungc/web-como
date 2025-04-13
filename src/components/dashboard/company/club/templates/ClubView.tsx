"use client";

import { useEffect, useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import ClubSearch from "@/components/dashboard/company/club/molecules/ClubSearch";
import ClubList from "@/components/dashboard/company/club/organisms/ClubList";

export default function ClubView() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    field: "club",
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
      {/* <ClubSearch
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
        handleSearch={handleSearch}
      /> */}
      <ClubList
        currentSearchFilter={currentSearchValue.filter!}
        currentSearchTerm={searchTerm}
      />
    </>
  );
}
