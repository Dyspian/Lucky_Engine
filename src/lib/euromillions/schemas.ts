// src/lib/euromillions/schemas.ts

import { z } from "zod";

/**
 * Zod schema for a single prize breakdown entry within a EuroMillions draw.
 * Permissive to prevent validation errors on optional fields.
 */
export const DrawPrizeSchema = z.object({
  prize: z.any(),
  winners: z.any(),
  matched_numbers: z.any(),
  matched_stars: z.any(),
}).passthrough();

export type DrawPrize = z.infer<typeof DrawPrizeSchema>;

/**
 * Zod schema for a single EuroMillions draw.
 * Extremely relaxed to ensure data loads even if fields are slightly different or missing.
 */
export const DrawSchema = z.object({
  // Accept almost anything for IDs and coerce to number if possible, else 0
  id: z.any().transform(val => Number(val) || 0),
  draw_id: z.any().transform(val => Number(val) || 0),
  
  // Ensure arrays exist, but don't fail on length or exact content types immediately
  numbers: z.array(z.number()).default([]),
  stars: z.array(z.number()).default([]),
    
  // Accept date as string, or convert
  date: z.string().or(z.date().transform(d => d.toISOString())), 
  
  // Coerce to boolean
  has_winner: z.any().transform(Boolean),
  
  // Optional prizes, default to empty
  prizes: z.array(DrawPrizeSchema).optional().default([]),
}).passthrough();

export type Draw = z.infer<typeof DrawSchema>;

/**
 * Zod schema for an array of EuroMillions draws.
 */
export const DrawArraySchema = z.array(DrawSchema);

export type DrawArray = z.infer<typeof DrawArraySchema>;