"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { closeModal, openModal } from "@/lib/utils";
import { deleteRefreshToken } from "@/lib/token";
import Avatar from "@/components/common/Avatar";
import Backdrop from "@/components/common/Backdrop";
import CloseIcon from "@/assets/icons/header/close.svg";

interface Props {
  profileImage?: string | null;
}

export default function ProfileDropdownModal({ profileImage }: Props) {
  const { refresh } = useRouter();

  const handleLogout = () => {
    deleteRefreshToken();
    refresh();
  };

  return (
    <div className="fixed modal hidden" id="profile-dropdown">
      <Backdrop invisible />
      <div className="fixed top-20 right-[38px] z-50 w-[390px] rounded-xl border border-gray-400">
        <div className="space-y-[28px] p-8 rounded-t-xl bg-gray-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar src={profileImage} />
              <span className="h3 font-semibold text-gray-900">{`${"김오모"}님`}</span>
            </div>
            <div
              className="flex items-center justify-end w-8 h-8 cursor-pointer"
              onClick={closeModal}
            >
              <Image src={CloseIcon} alt="닫기" width={24} height={24} />
            </div>
          </div>
          <div>
            <div className="space-y-1 p-3 rounded-md bg-orange-50">
              <span className="body-2 font-medium text-gray-600">
                {"관리중인 동호회"}
              </span>
              <div className="h4 font-bold text-gray-900">
                {"으쌰으쌰 산악회"}
              </div>
            </div>
            <div
              className="w-full p-3 h4 font-medium text-gray-700 cursor-pointer"
              onClick={() => openModal("customer-center")}
            >
              {"고객센터"}
            </div>
            <Link href={"/support"}>
              <div className="w-full p-3 h4 font-medium text-gray-700">
                {"문의 및 기술지원"}
              </div>
            </Link>
          </div>
        </div>
        <div
          className="w-full py-3.5 rounded-b-xl text-center h3 font-semibold text-gray-0 bg-brand-orange cursor-pointer"
          onClick={handleLogout}
        >
          {"로그아웃"}
        </div>
      </div>
    </div>
  );
}
