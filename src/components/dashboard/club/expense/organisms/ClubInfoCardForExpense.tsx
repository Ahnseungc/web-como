"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ClubProfileInfo from "@/components/dashboard/club/common/ClubProfileInfo";
import {
  CardInfo,
  ExpenseApplicationStatus,
} from "@/api/types/company/expense";
import { useState } from "react";
import ProfileInfoForExpense from "./ProfileInfoForExpense";

interface Props {
  padding?: string;
  cardInfo: CardInfo;
}

export default function ClubInfoCardForExpense({ padding, cardInfo }: Props) {
  const { clubImage, leadersSummary, activityPlan, memberCount, status } =
    cardInfo;
  const getStatus = (status: ExpenseApplicationStatus) => {
    switch (status) {
      case "PENDING":
        return "승인대기중";
      case "APPROVED":
        return "활동중";
      case "REJECTED":
        return "활동중단";
    }
  };

  const getStatusColor = (status: ExpenseApplicationStatus) => {
    switch (status) {
      case "PENDING":
        return "text-brand-orange";
      case "APPROVED":
        return "text-point-blue";
      case "REJECTED":
        return "text-point-red";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div
      className={cn("h-fit rounded-xl bg-gray-0", padding ? padding : "p-5")}
    >
      <div className="relative w-[350px] h-[350px] mb-6 rounded-lg object-cover bg-gray-300">
        {clubImage && (
          <Image
            src={clubImage}
            alt="동호회 이미지"
            fill
            sizes="30vw"
            priority
            className="rounded-lg"
          />
        )}
      </div>
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <h3 className="h2 font-bold text-gray-900">{"동호회명"}</h3>
          <span className={cn("body-1 font-medium", getStatusColor(status))}>
            {getStatus(status)}
          </span>
        </div>
        <hr />
        <div className="body-1 font-medium text-gray-500">
          <ProfileInfoForExpense
            activityPlan={activityPlan}
            memberCount={memberCount}
          />
          <span>{leadersSummary}</span>
        </div>
      </div>
    </div>
  );
}
