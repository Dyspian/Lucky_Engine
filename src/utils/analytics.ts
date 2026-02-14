import { track } from '@vercel/analytics/react';

/**
 * Tracks a custom event using Vercel Analytics.
 * Events are only tracked in production environments.
 * In development, they are logged to the console.
 *
 * @param eventName The name of the event to track.
 * @param properties Optional properties to associate with the event.
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'production') {
    track(eventName, properties);
  } else {
    console.log(`[Analytics - DEV] Event: ${eventName}`, properties);
  }
};