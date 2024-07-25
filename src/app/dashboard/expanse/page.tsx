"use client";

import { useState } from "react";
import ApplicationGuide from "@/components/dashboard/expanse/molecules/ApplicationGuide";
import ExpanseList from "@/components/dashboard/expanse/organisms/ExpanseList";
import ExpanseOverview from "@/components/dashboard/expanse/organisms/ExpanseOverview";
import ExpanseSearch, {
  type ExpanseSearchFilter,
} from "@/components/dashboard/expanse/molecules/ExpanseSearch";

export default function ExpansePage() {
  const [currentFilter, setCurrentFilter] =
    useState<ExpanseSearchFilter>("all");

  const handleChangeFilter = (filter: ExpanseSearchFilter) => {
    setCurrentFilter(filter);
  };

  return (
    <>
      <ApplicationGuide />
      <ExpanseOverview />
      <ExpanseSearch
        currentFilter={currentFilter}
        handleChangeFilter={handleChangeFilter}
      />
      <ExpanseList currentFilter={currentFilter} />
    </>
  );
}
