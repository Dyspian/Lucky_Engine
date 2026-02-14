"use client";

import { showSuccess, showError } from "./toast";

export const copyTicketToClipboard = async (numbers: number[], stars: number[]) => {
  const text = `EuroMillions Geluksgetallen: ${numbers.join(', ')} | Sterren: ${stars.join(', ')}`;
  
  try {
    await navigator.clipboard.writeText(text);
    showSuccess("Getallen gekopieerd naar klembord!");
  } catch (err) {
    showError("Kon niet kopiëren naar klembord.");
  }
};