// src/lib/euromillions/schemas.ts

import { z } from "zod";

/**
 * Zod schema for a single prize breakdown entry within a EuroMillions draw.
 */
export const DrawPrizeSchema = z.object({
  prize: z.number().min(0, "Prize amount cannot be negative."),
  winners: z.number().int().min(0, "Number of winners cannot be negative."),
  matched_numbers: z.number().int().min(0, "Matched numbers count cannot be negative."),
  matched_stars: z.number().int().min(0, "Matched stars count cannot be negative."),
});

export type DrawPrize = z.infer<typeof DrawPrizeSchema>;

/**
 * Zod schema for a single EuroMillions draw.
 * Includes strict validation rules for numbers, stars, and date format.
 */
export const DrawSchema = z.object({
  id: z.number().int().positive("Draw ID must be a positive integer."),
  draw_id: z.number().int().positive("Internal draw ID must be a positive integer."),
  numbers: z.array(
    z.number().int().min(1, "Number must be between 1 and 50.").max(50, "Number must be between 1 and 50.")
  ).superRefine((val, ctx) => {
    if (val.length !== 5) {
      console.warn(`[Schema Warning] Draw numbers array has length ${val.length}, expected 5. Data: ${val.join(',')}`);
      // Do not crash, but log a warning as per requirements
    }
  }),
  stars: z.array(
    z.number().int().min(1, "Star must be between 1 and 12.").max(12, "Star must be between 1 and 12.")
  ).superRefine((val, ctx) => {
    if (val.length !== 2) {
      console.warn(`[Schema Warning] Draw stars array has length ${val.length}, expected 2. Data: ${val.join(',')}`);
      // Do not crash, but log a warning as per requirements
    }
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
  has_winner: z.boolean(),
  prizes: z.array(DrawPrizeSchema),
});

export type Draw = z.infer<typeof DrawSchema>;

/**
 * Zod schema for an array of EuroMillions draws.
 */
export const DrawArraySchema = z.array(DrawSchema);

export type DrawArray = z.infer<typeof DrawArraySchema>;