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

export function convertToDate(dateString: any) {
  const [year, month, day, hours, minutes, seconds] = dateString
    .split("-")
    .map(Number);
  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  return date;
}

export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function formatTime(date: Date | undefined, withIndicator?: boolean) {
  if (!date) {
    return "";
  }
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours < 12 ? "오전" : "오후";

  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const formattedTime = `${formattedHours}:${formattedMinutes}`;
  if (withIndicator) {
    return `${period} ${formattedTime}`;
  }
  return formattedTime;
}

export function formatDateTime(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return `${formatDate(date)} ${formatTime(date, true)}`;
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

export function formatFileSize(bytes: number) {
  let number = Math.round(bytes / 1000);
  let text = "KB";

  if (number === 0) {
    number = bytes / 1000;
  } else if (number.toString().length > 3) {
    number = parseFloat((bytes / 1000).toFixed(1));
    text = "MB";
  }

  return `${number.toLocaleString()} ${text}`;
}
