"use client";

import { showSuccess, showError } from "./toast";
import { trackEvent } from "./analytics"; // Import trackEvent

export const copyTicketToClipboard = async (numbers: number[], stars: number[]) => {
  const text = `EuroMillions Geluksgetallen: ${numbers.join(', ')} | Sterren: ${stars.join(', ')}`;
  
  try {
    await navigator.clipboard.writeText(text);
    showSuccess("Getallen gekopieerd naar klembord!");
    trackEvent("Ticket Copied", { numbers: numbers.join(','), stars: stars.join(',') }); // Track event
  } catch (err) {
    showError("Kon niet kopiëren naar klembord.");
    trackEvent("Ticket Copy Failed"); // Track failure
  }
};