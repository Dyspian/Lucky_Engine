import { addDays, isFriday, isTuesday, isAfter, set, nextTuesday, nextFriday, format } from "date-fns";
import { nl } from "date-fns/locale";

/**
 * Calculates the next EuroMillions draw date (Tuesday or Friday at 21:00).
 * Used to inject "freshness" into SEO titles.
 */
export function getNextDrawDate(): Date {
  const now = new Date();
  
  // Set draw time reference (21:00 CET is usually the cutoff/draw time)
  const todayDrawTime = set(now, { hours: 21, minutes: 0, seconds: 0, milliseconds: 0 });

  // If today is Tuesday or Friday AND we are before the draw time, today is the next draw.
  if ((isTuesday(now) || isFriday(now)) && !isAfter(now, todayDrawTime)) {
    return now;
  }

  // Otherwise, find the next Tuesday and next Friday, and pick the closest one.
  const nextTues = nextTuesday(now);
  const nextFri = nextFriday(now);

  return isAfter(nextTues, nextFri) ? nextFri : nextTues;
}

/**
 * Formats the next draw date for the title tag.
 * Example: "Vr 14 Feb"
 */
export function formatNextDrawDateShort(date: Date): string {
  return format(date, "EEE d MMM", { locale: nl });
}

export const SITE_NAME = "Lucky Engine";
export const DEFAULT_TITLE = "EuroMillions Statistieken & Generator";
export const DEFAULT_DESCRIPTION = "Gratis EuroMillions statistieken tool. Analyseer frequentie, recentheid en genereer wiskundig gewogen getallenreeksen. Geen garanties, puur data.";
export const SITE_URL = "https://lucky-engine.com"; // Replace with actual domain later