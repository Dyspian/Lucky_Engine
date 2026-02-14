// src/lib/euromillions/schemas.ts

import { z } from "zod";

/**
 * Zod schema for a single prize breakdown entry within a EuroMillions draw.
 */
export const DrawPrizeSchema = z.object({
  prize: z.number().min(0).or(z.string().transform(Number)), // Handle string numbers if necessary
  winners: z.number().int().min(0).or(z.string().transform(Number)),
  matched_numbers: z.number().int().min(0),
  matched_stars: z.number().int().min(0),
});

export type DrawPrize = z.infer<typeof DrawPrizeSchema>;

/**
 * Zod schema for a single EuroMillions draw.
 * Relaxed validation to prevent app breakage on minor API changes.
 */
export const DrawSchema = z.object({
  // Accept string or number for IDs, normalize to number
  id: z.union([z.number(), z.string()]).transform(val => Number(val)), 
  draw_id: z.union([z.number(), z.string()]).transform(val => Number(val)),
  
  numbers: z.array(z.number().int().min(1).max(50))
    .superRefine((val, ctx) => {
      if (val.length !== 5) {
        console.warn(`[Schema Warning] Draw numbers array has length ${val.length}, expected 5.`);
      }
    }),
    
  stars: z.array(z.number().int().min(1).max(12))
    .superRefine((val, ctx) => {
      if (val.length !== 2) {
        console.warn(`[Schema Warning] Draw stars array has length ${val.length}, expected 2.`);
      }
    }),
    
  // Accept simple string for date, validation logic in code can handle invalid dates
  date: z.string(), 
  
  // Coerce any truthy/falsy value to boolean just in case
  has_winner: z.any().transform(Boolean),
  
  // Make prizes optional or empty array default
  prizes: z.array(DrawPrizeSchema).optional().default([]),
});

export type Draw = z.infer<typeof DrawSchema>;

/**
 * Zod schema for an array of EuroMillions draws.
 */
export const DrawArraySchema = z.array(DrawSchema);

export type DrawArray = z.infer<typeof DrawArraySchema>;