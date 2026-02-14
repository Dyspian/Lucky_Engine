// src/services/euromillions.ts

import { fetchDraws } from "@/lib/euromillions-provider";
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
 * Retrieves draws using the unified provider (Live API + Local History).
 * Applies filtering based on query parameters.
 */
export async function getEuromillionsDraws(params?: EuromillionsQueryParams): Promise<Draw[]> {
  // 1. Fetch unified data (Live + Local)
  const { draws } = await fetchDraws();
  let results = [...draws];

  // 2. Apply filters in memory
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