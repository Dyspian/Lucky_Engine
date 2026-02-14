// src/services/euromillions.ts

import { LOCAL_HISTORY } from "@/data/history";
import { Draw } from "@/lib/euromillions/schemas";
import { z } from "zod";
import { parseISO, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";

export class DataUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataUnavailableError";
  }
}

export const EuromillionsQueryParamsBaseSchema = z.object({
  year: z.number().int().min(2004).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type EuromillionsQueryParams = z.infer<typeof EuromillionsQueryParamsBaseSchema>;

/**
 * Retrieves draws from the local archive with filtering.
 */
export async function getEuromillionsDraws(params?: EuromillionsQueryParams): Promise<Draw[]> {
  // Start with full history
  let results = [...LOCAL_HISTORY];

  // Apply filters in memory
  if (params) {
    if (params.year) {
      results = results.filter(d => new Date(d.date).getFullYear() === params.year);
    }

    if (params.startDate) {
      const start = startOfDay(parseISO(params.startDate));
      results = results.filter(d => isAfter(parseISO(d.date), start) || d.date === params.startDate);
    }

    if (params.endDate) {
      const end = endOfDay(parseISO(params.endDate));
      results = results.filter(d => isBefore(parseISO(d.date), end) || d.date === params.endDate);
    }
  }

  // Always return sorted descending
  return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}