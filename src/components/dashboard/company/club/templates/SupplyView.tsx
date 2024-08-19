"use client";

import { useEffect, useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import SupplySearch from "@/components/dashboard/company/club/molecules/SupplySearch";
import SupplyList from "@/components/dashboard/company/club/organisms/SupplyList";

export default function SupplyView() {
  const [currentSearchValue, setCurrentSearchValue] = useState<SearchValue>({
    term: "",
    filter: "all",
    field: "clubName",
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
      <SupplySearch
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
        handleSearch={handleSearch}
      />
      <SupplyList />
    </>
  );
}
