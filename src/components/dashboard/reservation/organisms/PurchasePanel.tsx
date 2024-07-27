"use client";

import { useEffect, useState } from "react";
import { openModal } from "@/lib/utils";
import Checkbox from "@/components/common/Checkbox";

export default function PurchasePanel() {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState({
    check1: false,
    check2: false,
    check3: false,
  });

  const total = { qty: 6, price: 250000, coupon: 0, paid: 0 };

  useEffect(() => {
    setIsSubmitDisabled(
      !isChecked.check1 || !isChecked.check2 || !isChecked.check3
    );
  }, [isChecked]);

  return (
    <div className="sticky top-[72px] inset-x-0 flex justify-end w-[490px] h-fit max-h-[860px]">
      <div className="flex flex-col gap-6 w-full py-8 px-5 rounded-xl bg-gray-0 shadow">
        <h4 className="font-bold text-gray-900">{"결제금액"}</h4>
        <hr className="border-gray-400" />
        <div className="space-y-3 py-1">
          <div className="flex items-center justify-between body-1 font-medium text-gray-900">
            <span className="font-bold text-gray-500">{"총 금액"}</span>
            {`${total.price.toLocaleString()}원`}
          </div>
          {total.paid > 0 && (
            <div className="flex items-center justify-between body-1 font-medium text-gray-900">
              <span className="font-bold text-gray-500">{"기존 결제금액"}</span>
              {`-${total.paid.toLocaleString()}원`}
            </div>
          )}
          <div className="flex items-center justify-between body-1 font-medium text-gray-900">
            <span className="font-bold text-gray-500">{"쿠폰 할인 금액"}</span>
            {`-${total.coupon.toLocaleString()}원`}
          </div>
        </div>
        <hr className="border-gray-400" />
        <div className="space-y-3">
          <div className="space-y-4">
            <Checkbox
              name="check-all"
              content="결제 내역을 확인했으며, 아래 내용에 모두 동의합니다."
              style="h4 font-bold text-gray-900"
              checked={!isSubmitDisabled}
              onChange={(e) =>
                setIsChecked({
                  check1: e.target.checked,
                  check2: e.target.checked,
                  check3: e.target.checked,
                })
              }
            />
            <Checkbox
              name="check-1"
              content={
                <>
                  {"[필수] 개인정보 수집/이용 동의"}
                  <span
                    className="underline underline-offset-2"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {"보기"}
                  </span>
                </>
              }
              style="body-1 font-medium text-gray-500"
              checked={isChecked.check1}
              onChange={(e) =>
                setIsChecked((prev) => {
                  return { ...prev, check1: e.target.checked };
                })
              }
            />
            <Checkbox
              name="check-2"
              content={
                <>
                  {"[필수] 개인정보 제3자 제공 동의"}
                  <span
                    className="underline underline-offset-2"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {"보기"}
                  </span>
                </>
              }
              style="body-1 font-medium text-gray-500"
              checked={isChecked.check2}
              onChange={(e) =>
                setIsChecked((prev) => {
                  return { ...prev, check2: e.target.checked };
                })
              }
            />
            <Checkbox
              name="check-3"
              content={
                <>
                  {"[필수] omo결제서비스 이용 동의"}
                  <span
                    className="underline underline-offset-2"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {"보기"}
                  </span>
                </>
              }
              style="body-1 font-medium text-gray-500"
              checked={isChecked.check3}
              onChange={(e) =>
                setIsChecked((prev) => {
                  return { ...prev, check3: e.target.checked };
                })
              }
            />
          </div>
          <div className="flex justify-between h2 py-6">
            <span className="font-bold text-gray-900">{`총 ${total.qty.toLocaleString()}개`}</span>
            <span className="font-extrabold text-brand-orange">
              {`${(total.price - total.coupon - total.paid).toLocaleString()}원`}
            </span>
          </div>
          <button
            disabled={isSubmitDisabled}
            className="w-full py-3.5 rounded-md h4 font-semibold disabled:text-gray-400 text-gray-50 disabled:bg-gray-200 bg-gray-900"
            onClick={() => openModal('purchase-success')}
          >
            {"예약하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
