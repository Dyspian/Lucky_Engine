// src/utils/formatters.ts

import { format } from "date-fns";
import { nl } from "date-fns/locale";

/**
 * Formats a number as Euro currency.
 * @param amount - The amount to format.
 * @returns The formatted Euro string.
 */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a date string into a more readable Dutch format.
 * @param dateString - The date string (YYYY-MM-DD) to format.
 * @returns The formatted date string.
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string provided.");
    }
    return format(date, "EEEE d MMMM yyyy", { locale: nl });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if formatting fails
  }
}