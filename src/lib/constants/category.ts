import { CATEGORY } from "@/lib/types/enum";

export type CategoryKey = keyof typeof CATEGORY;

export const CATEGORY_OPTIONS: { label: string; value: CategoryKey }[] = (
  Object.entries(CATEGORY) as [CategoryKey, string][]
).map(([value, label]) => ({ value, label }));

export const getCategoryLabel = (key: string | undefined | null): string =>
  key && key in CATEGORY ? CATEGORY[key as CategoryKey] : "";
