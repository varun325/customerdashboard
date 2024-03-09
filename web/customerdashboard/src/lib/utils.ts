import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const parseDateTime = (
  dateTimeString: string
): { date: string; time: string } => {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();
  return { date, time };
};
