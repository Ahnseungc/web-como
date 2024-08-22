"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/api/action";
import type { MemberDetailData } from "@/api/types/club/member/detail";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import { Close } from "@/assets/icons/action";

interface Props {
  id?: number;
}

export default function NewMemberDetailModal({ id }: Props) {
  const { data } = useQuery({
    queryKey: ["club-manage-member", "detail", id],
    queryFn: () =>
      getData(`v2/club/web/member/detail/${id}`, false).then(
        (res) => res.data as MemberDetailData
      ),
    enabled: !!id,
  });

  return (
    <div id="new-member-detail" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 w-full max-w-[594px] p-4 rounded-xl bg-gray-0 shadow">
        {data && (
          <div className="space-y-8 h-full max-h-[80dvh] overflow-y-auto p-4 scrollbar-custom">
            <div className="flex items-start justify-between">
              <div className="flex space-x-7">
                <div className="relative w-[200px] h-[200px] rounded-xl bg-brand-black">
                  {data.profile && (
                    <Image
                      src={data.profile}
                      alt="직원 사진"
                      fill
                      sizes="15vw"
                      className="rounded-xl"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-between py-2">
                  <div className="space-y-1">
                    <h2 className="h1 font-bold text-gray-900">{data.name}</h2>
                    <span className="h4 font-bold text-brand-orange">
                      {data.department}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    <li className="flex items-center h4 font-normal text-gray-800">
                      <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                        {"내선번호"}
                      </div>
                      {data.extension}
                    </li>
                    <li className="flex items-center h4 font-normal text-gray-800">
                      <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                        {"연락처"}
                      </div>
                      {data.phoneNumber}
                    </li>
                    <li className="flex items-center h4 font-normal text-gray-800">
                      <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                        {"이메일"}
                      </div>
                      {data.email}
                    </li>
                  </ul>
                </div>
              </div>
              <button onClick={() => closeModal()}>
                <Close className="w-8 h-8 text-gray-600" />
              </button>
            </div>
            <div className="space-y-6">
              {data.question.map((question, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{`Q. ${question}`}</h3>
                  <p className="p-3 rounded-md bg-gray-100">{data.answer[i]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
