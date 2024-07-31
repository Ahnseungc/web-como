import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openModal(id: string) {
  const modal = document.querySelector(`#${id}.modal`);
  modal?.classList.remove("hidden");
}

export const closeModal = (id?: string) => {
  if (id) {
    const modal = document.querySelector(`#${id}.modal`);
    modal?.classList.add("hidden");
  } else {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.add("hidden"));

    const inputs = document.querySelectorAll(".modal .modal-input");
    inputs.forEach((input) => ((input as HTMLInputElement).value = ""));
  }
};

export function getPageRange(num: number) {
  const start = Math.floor((num - 1) / 5) * 5 + 1;

  const range = [];
  for (let i = 0; i < 5; i++) {
    range.push(start + i);
  }

  return range;
}

export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
}

export function formatTime(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

export function formatTimeWithIndicator(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours < 12 ? "오전" : "오후";

  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${period} ${formattedHours}:${formattedMinutes}`;
}

export function formatDateTime(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return `${formatDate(date)} ${formatTime(date)}`;
}

export function generateQuarterHourlyIntervals(
  startDate: Date,
  endDate: Date,
  intervalMinutes: number
): Date[] {
  const intervals: Date[] = [];
  const intervalMillis = intervalMinutes * 60 * 1000;

  let currentDate = new Date(startDate.getTime());

  while (currentDate <= endDate) {
    intervals.push(new Date(currentDate));
    currentDate = new Date(currentDate.getTime() + intervalMillis);
  }
  console.log(intervals);
  return intervals;
}
