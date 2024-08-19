"use client";

import { useEffect, useState } from "react";
import type { SearchValue } from "@/lib/types/search";
import ExpenseSearch from "@/components/dashboard/company/club/molecules/ExpenseSearch";
import ExpenseList from "@/components/dashboard/company/club/organisms/ExpenseList";

export default function ExpenseView() {
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
      <ExpenseSearch
        currentSearchValue={currentSearchValue}
        setCurrentSearchValue={setCurrentSearchValue}
        handleSearch={handleSearch}
      />
      <ExpenseList />
    </>
  );
}
