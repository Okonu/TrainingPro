import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a number with a suffix
export function formatNumber(value: number, suffix: string = "") {
  return value.toLocaleString() + suffix;
}

// Function to generate a linear gradient background
export function gradientBackground(
  from: string = "from-secondary",
  to: string = "to-accent",
  direction: string = "bg-gradient-to-r"
) {
  return `${direction} ${from} ${to}`;
}

// Function to format date to a readable format
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Function to get month name
export function getMonthName(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
}

// Function to get day number
export function getDayNumber(date: Date): number {
  return date.getDate();
}

// Function to get year
export function getYear(date: Date): number {
  return date.getFullYear();
}

// Function to throttle function calls
export function throttle(callback: Function, delay: number = 100) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: any[]) {
    if (!timeout) {
      timeout = setTimeout(() => {
        callback(...args);
        timeout = null;
      }, delay);
    }
  };
}
