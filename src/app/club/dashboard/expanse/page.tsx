"use client";

import { useState } from "react";
import ApplicationGuide from "@/components/dashboard/club/expanse/molecules/ApplicationGuide";
import ExpanseList from "@/components/dashboard/club/expanse/organisms/ExpanseList";
import ExpanseOverview from "@/components/dashboard/club/expanse/organisms/ExpanseOverview";
import ExpanseSearch from "@/components/dashboard/club/expanse/molecules/ExpanseSearch";
import NewReceiptFormModal from "@/components/dashboard/club/expanse/modals/NewReceiptFormModal";

export default function ExpansePage() {
  const [currentFilter, setCurrentFilter] = useState<string>("all");

  const handleChangeFilter = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <>
      <ApplicationGuide />
      <ExpanseOverview />
      <ExpanseSearch />
      <ExpanseList />
      <div className="m-0">
        <NewReceiptFormModal />
      </div>
    </>
  );
}
