import { RankedResult } from "./stats-engine";

export type Ticket = {
  numbers: number[];
  stars: number[];
};

export function generateTickets(stats: RankedResult, count: number): Ticket[] {
  // Hard cap at 10 tickets
  const ticketCount = Math.min(Math.max(1, count), 10);
  const tickets: Ticket[] = [];

  const selectWeighted = (pool: number[], countToSelect: number) => {
    const selected: number[] = [];
    const available = [...pool];

    while (selected.length < countToSelect && available.length > 0) {
      // We use a bias towards the higher-ranked items (start of the array)
      // but maintain randomness by using a non-linear distribution
      const index = Math.floor(Math.pow(Math.random(), 2) * available.length);
      selected.push(available.splice(index, 1)[0]);
    }

    return selected.sort((a, b) => a - b);
  };

  for (let i = 0; i < ticketCount; i++) {
    let newTicket: Ticket;
    let isDuplicate: boolean;

    do {
      newTicket = {
        numbers: selectWeighted(stats.rankedNumbers, 5),
        stars: selectWeighted(stats.rankedStars, 2),
      };

      isDuplicate = tickets.some(
        (t) =>
          JSON.stringify(t.numbers) === JSON.stringify(newTicket.numbers) &&
          JSON.stringify(t.stars) === JSON.stringify(newTicket.stars)
      );
    } while (isDuplicate && tickets.length < 100); // Safety break

    tickets.push(newTicket);
  }

  return tickets;
}