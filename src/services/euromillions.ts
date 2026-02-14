// src/services/euromillions.ts

import { fetchDraws as fetchDrawsClient, DataUnavailableError } from "@/lib/euromillions/client";
import { Draw } from "@/lib/euromillions/schemas";
import { z } from "zod";

/**
 * Schema for validating query parameters for the client-side service.
 */
export const EuromillionsQueryParamsSchema = z.object({
  year: z.number().int().min(2004, "Year must be 2004 or later.").optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format.").optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format.").optional(),
}).superRefine((data, ctx) => {
  if (data.startDate && data.endDate && data.startDate > data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Start date cannot be after end date.",
      path: ["startDate"],
    });
  }
});

export type EuromillionsQueryParams = z.infer<typeof EuromillionsQueryParamsSchema>;

/**
 * Fetches EuroMillions draws using the hardened client.
 * This acts as the client-side "internal proxy" for components.
 *
 * @param params - Query parameters for filtering draws.
 * @returns A promise that resolves to an array of Draw objects.
 * @throws DataUnavailableError if data cannot be retrieved.
 */
export async function getEuromillionsDraws(params?: EuromillionsQueryParams): Promise<Draw[]> {
  const clientParams = {
    year: params?.year,
    dates: {
      start: params?.startDate,
      end: params?.endDate,
    },
  };

  try {
    const { draws } = await fetchDrawsClient(clientParams);
    return draws;
  } catch (error) {
    console.error("[Euromillions Service] Failed to fetch draws:", error);
    if (error instanceof DataUnavailableError) {
      throw error;
    }
    throw new DataUnavailableError("Failed to retrieve EuroMillions draws.", { originalError: error });
  }
}