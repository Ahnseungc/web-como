import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import ExpenseReportForm from "@/components/dashboard/club/expense/organisms/ExpenseReportForm";
import BackButton from "@/components/dashboard/common/BackButton";
import React from "react";

const Page = () => {
  return (
    <>
      <BackButton />
      <div className="flex gap-3">
        <ClubInfoCard />
        <ExpenseReportForm />
      </div>
    </>
  );
};

export default Page;
