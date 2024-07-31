"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn, formatDate } from "@/lib/utils";
import Calendar from "@/components/common/Calendar";
import OptionItem from "@/components/dashboard/club/reservation/molecules/OptionItem";
import TimeSelectButton from "@/components/dashboard/club/reservation/molecules/TimeSelectButton";
import { Calendar as CalendarIcon } from "@/assets/icons/info";
import { ChevronDownFilled } from "@/assets/icons/chevron";

export interface Option {
  id: number;
  name: string;
  price: number;
  availableQty: number;
  selectedQty: number;
}

const options = [
  { id: 1, name: "옵션1", price: 50000, availableQty: 49, selectedQty: 0 },
  { id: 2, name: "옵션2", price: 40000, availableQty: 4, selectedQty: 0 },
  { id: 3, name: "옵션3", price: 25000, availableQty: 15, selectedQty: 0 },
  { id: 4, name: "옵션4", price: 74000, availableQty: 26, selectedQty: 0 },
  { id: 5, name: "옵션5", price: 60000, availableQty: 100, selectedQty: 0 },
];

interface DateTime {
  date: Date | undefined;
  time: string;
}

interface Total {
  qty: number;
  price: number;
}

const availableTime = ["8:00", "10:00", "12:00", "17:00", "20:00", "22:00"];

export default function ReservationPanel() {
  const pathname = usePathname();
  const { push } = useRouter();

  const [isDateSelectMode, setIsDateSelectMode] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime>({
    date: undefined,
    time: "",
  });
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(options);
  const [selectedTotal, setSelectedTotal] = useState<Total>({
    qty: 0,
    price: 0,
  });

  const availableTimeBeforeNoon = availableTime.filter(
    (time) => parseInt(time.slice(0, 2)) < 12
  );
  const availableTimeAfterNoon = availableTime.filter(
    (time) => parseInt(time.slice(0, 2)) >= 12
  );

  useEffect(() => {
    const totalQty = selectedOptions
      .map((item) => item.selectedQty)
      .reduce((acc, cur) => acc + cur);
    const totalPrice = selectedOptions
      .map((item) => item.selectedQty * item.price)
      .reduce((acc, cur) => acc + cur);

    setSelectedTotal({ qty: totalQty, price: totalPrice });
  }, [selectedOptions]);

  useEffect(() => {
    if (
      !selectedDateTime.date ||
      !selectedDateTime.time ||
      selectedTotal.qty < 1
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [selectedDateTime, selectedTotal]);

  return (
    <div className="sticky top-[72px] inset-x-0 flex justify-end w-[490px] h-fit max-h-[860px]">
      <div className="flex flex-col gap-6 w-full py-8 px-5 rounded-xl bg-gray-0 shadow">
        <div className="space-y-3">
          <div className="flex gap-2 h4 font-bold text-gray-900">
            <CalendarIcon className="w-6 h-6" />
            {"날짜와 시간을 선택해 주세요"}
          </div>
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setIsDateSelectMode((prev) => !prev)}
          >
            <input
              readOnly
              name="date"
              placeholder="날짜선택"
              className="w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-400 h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-50 cursor-pointer select-none"
              value={formatDate(selectedDateTime.date)}
            />
            <input
              readOnly
              name="time"
              placeholder="시간선택"
              className="w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-400 h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-50 cursor-pointer select-none"
              value={selectedDateTime.time}
            />
            <ChevronDownFilled
              className={cn(
                "min-w-5 min-h-5 text-gray-500 transition-all duration-300",
                isDateSelectMode ? "rotate-180" : ""
              )}
            />
          </div>
        </div>
        {isDateSelectMode ? (
          <div className="space-y-3">
            <Calendar
              wrapperStyle="flex justify-center"
              selected={selectedDateTime.date}
              onSelect={(date: Date | undefined) =>
                setSelectedDateTime((prev) => {
                  return { ...prev, date };
                })
              }
            />
            <hr className="border-gray-400" />
            {availableTimeBeforeNoon && (
              <div className="space-y-2">
                <span className="body-1 font-medium text-gray-500">
                  {"오전"}
                </span>
                <div className="flex gap-2">
                  {availableTimeBeforeNoon.map((time) => (
                    <TimeSelectButton
                      key={time}
                      value={time}
                      isSelected={time === selectedDateTime.time}
                      handleClick={() =>
                        setSelectedDateTime((prev) => {
                          if (prev.time === time) {
                            return { ...prev, time: "" };
                          }
                          return { ...prev, time };
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            )}
            {availableTimeAfterNoon && (
              <div className="space-y-2">
                <span className="body-1 font-medium text-gray-500">
                  {"오후"}
                </span>
                <div className="flex gap-2">
                  {availableTimeAfterNoon.map((time) => (
                    <TimeSelectButton
                      key={time}
                      value={time}
                      isSelected={time === selectedDateTime.time}
                      handleClick={() =>
                        setSelectedDateTime((prev) => {
                          if (prev.time === time) {
                            return { ...prev, time: "" };
                          }
                          return { ...prev, time };
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-2 h4 font-bold text-gray-900">
              {"옵션선택"}
            </div>
            <div className="flex flex-col gap-2 h-[482px] overflow-y-auto">
              {selectedOptions.map((option) => (
                <OptionItem
                  key={option.id}
                  option={option}
                  handleChangeQty={(newQty: number) =>
                    setSelectedOptions((prev) =>
                      prev.map((item) => {
                        if (item.id === option.id) {
                          return { ...item, selectedQty: newQty };
                        } else {
                          return item;
                        }
                      })
                    )
                  }
                />
              ))}
            </div>
          </div>
        )}
        <div className="pt-6 border-t border-gray-400">
          {isDateSelectMode ? (
            <button
              disabled={!selectedDateTime.date || !selectedDateTime.time}
              className="w-full py-3.5 rounded-md h4 font-semibold disabled:text-gray-400 text-gray-50 disabled:bg-gray-200 bg-gray-900"
              onClick={() => setIsDateSelectMode(false)}
            >
              {"옵션 선택하기"}
            </button>
          ) : (
            <>
              <div className="flex justify-between mb-6 h2">
                <span className="font-bold text-gray-900">{`총 ${selectedTotal.qty.toLocaleString()}개`}</span>
                <span className="font-extrabold text-brand-orange">
                  {`${selectedTotal.price.toLocaleString()}원`}
                </span>
              </div>
              <button
                disabled={isSubmitDisabled}
                className="w-full py-3.5 rounded-md h4 font-semibold disabled:text-gray-400 text-gray-50 disabled:bg-gray-200 bg-gray-900"
                onClick={() => push(`${pathname}/purchase`)}
              >
                {"예약하기"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
