import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openModal(id: string) {
  const modal = document.querySelector(`#${id}.modal`);
  modal?.classList.remove("hidden");
}

export const closeModal = () => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => modal.classList.add("hidden"));

  const inputs = document.querySelectorAll(".modal .modal-input");
  inputs.forEach((input) => ((input as HTMLInputElement).value = ""));
};

export function getPageRange(num: number) {
  const start = Math.floor((num - 1) / 5) * 5 + 1;

  const range = [];
  for (let i = 0; i < 5; i++) {
    range.push(start + i);
  }

  return range;
}
