"use client";

import { useQuery } from "@tanstack/react-query";
import { closeModal } from "@/lib/utils";
import { getClubName } from "@/lib/cookies";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Textarea from "@/components/common/Textarea";

interface Props {
  name: string;
}

export default function CancelApplicationModal({ name }: Props) {
  const { data } = useQuery({
    queryKey: ["cookies", "clubName"],
    queryFn: () => getClubName().then((clubName) => clubName),
  });

  return (
    <div id="cancel-application" className="hidden modal">
      <Backdrop />
      <form className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[524px] p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-gray-900">
          {"정말 반려하시겠습니까?"}
        </h2>
        <div className="space-y-3">
          <p className="text-center h4 font-normal text-gray-800">
            <span className="font-semibold">{data}</span>
            {`에 가입 신청한 `}
            <span className="font-semibold">{name}</span>
            {`에게\n반려 사유와 함께 안내 메일이 송신됩니다.`}
          </p>
          <Textarea
            required
            name="reason"
            placeholder="반려사유 입력창"
            rows={6}
          />
        </div>
        <div className="flex space-x-3">
          <Button content="닫기" onClick={() => closeModal()} type="button" />
          <Button content="반려하기" primary type="submit" />
        </div>
      </form>
    </div>
  );
}
