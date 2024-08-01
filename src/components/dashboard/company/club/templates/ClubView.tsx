"use client";

import { useEffect, useState } from "react";
import {
  initialSearchValueWithFilter,
  SearchValueWithFilter,
} from "@/lib/types/search";
import ClubSearch from "@/components/dashboard/company/club/molecules/ClubSearch";
import ClubList from "@/components/dashboard/company/club/organisms/ClubList";

export default function ClubView() {
  const [currentSearchValue, setCurrentSearchValue] =
    useState<SearchValueWithFilter>(initialSearchValueWithFilter);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log(currentSearchValue.filter);
  }, [currentSearchValue.filter]);

  const handleSearch = () => {
    console.log(currentSearchValue.term);
    setSearchTerm(currentSearchValue.term);
  };

  return (
    <>
      <ClubSearch
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
        handleSearch={handleSearch}
      />
      <ClubList
        currentSearchFilter={currentSearchValue.filter}
        currentSearchTerm={searchTerm}
      />
    </>
  );
}
