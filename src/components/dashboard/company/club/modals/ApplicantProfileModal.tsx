"use client";

import Image from "next/image";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import { Close } from "@/assets/icons/action";
import { useState, useEffect } from "react";
import { getData } from "@/api/action";

interface ApplicantData {
  name: string;
  department: string;
  email: string;
  profileImage?: string; // profileImage는 선택적 속성으로 설정
  managingClubList: string[];
}

export default function ApplicantProfileModal({ applicantId }: { applicantId: number }) {
  const image = null;
  // const clubs = true ? [1, 2, 3] : null;
  const [loading, setLoading] = useState(true);
  const [applicantData, setApplicantData] = useState<ApplicantData | null>(null);
  const [modalParams, setModalParams] = useState<any>(null);

  useEffect(() => {
    const modal = document.getElementById('applicant-profile');
    if (modal) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-modal-params') {
            const newParams = modal.dataset.modalParams;
            if (newParams) {
              setModalParams(JSON.parse(newParams));
            }
          }
        });
      });

      observer.observe(modal, {
        attributes: true,
        attributeFilter: ['data-modal-params']
      });

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const res = await getData(`v1/manager/member/${modalParams.applicantId}/modal`);
        console.log(res.data);
        setApplicantData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("신청자 정보 로딩 오류:", error);
      }
    };
    fetchApplicantData();
  }, [modalParams]);

  return (
    <div id="applicant-profile" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-9 w-full max-w-[544px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex items-start justify-between">
          <div className="flex space-x-7">
            <div className="relative object-cover w-[200px] h-[200px] rounded-xl bg-brand-black">
              {image && (
                <Image
                  src={ applicantData?.profileImage || image}
                  alt="직원 사진"
                  fill
                  sizes="15vw"
                  className="rounded-xl"
                />
              )}
            </div>
            <div className="flex flex-col justify-between py-2">
              <div className="space-y-1">
                <h2 className="h1 font-bold text-gray-900">
                  {applicantData?.name || "김오모"}
                </h2>
                <span className="h4 font-bold text-brand-orange">
                  {applicantData?.department || "경영지원팀"}
                </span>
              </div>
              <ul className="space-y-1">
                {/* <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                    {"내선번호"}
                  </div>
                  {"0000-0000"}
                </li>
                <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                    {"연락처"}
                  </div>
                  {"0000-0000-0000"}
                </li> */}
                <li className="flex items-center h4 font-normal text-gray-800">
                  <div className="w-14 mr-2 body-2 font-bold text-gray-900">
                    {"이메일"}
                  </div>
                  {applicantData?.email || "omo@naver.com"}
                </li>
              </ul>
            </div>
          </div>
          <button onClick={() => closeModal()}>
            <Close className="w-8 h-8 text-gray-600" />
          </button>
        </div>
        <div className="space-y-3 p-3 rounded-md bg-orange-50">
          <div className="body-2 font-medium text-gray-600">
            {"현재 관리중인 동호회"}
          </div>
          {applicantData?.managingClubList && applicantData.managingClubList.length > 0 ? (
            applicantData.managingClubList.map((club) => (
              <div key={club} className="h4 font-bold text-gray-900">
                {`${club}`}
              </div>
            ))
          ) : (
            <div className="h4 font-bold text-brand-orange">
              {"관리중인 동호회가 없습니다"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
