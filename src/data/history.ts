import { Draw } from "@/lib/euromillions/schemas";

// --- BELANGRIJK / IMPORTANT ---
// Omdat we geen externe API gebruiken, is dit bestand de "waarheid" voor de engine.
// U moet de meest recente trekkingen hieronder handmatig toevoegen om de voorspellingen accuraat te houden.
// Since we don't use an external API, this file is the "source of truth".
// You must manually add the latest draws below to keep predictions accurate.

export const LOCAL_HISTORY: Draw[] = [
  // --- REAL 2025 Draws (Up to Feb) ---
  {
    id: 1711,
    draw_id: 1711,
    date: "2025-02-14",
    numbers: [7, 23, 30, 32, 36],
    stars: [8, 12],
    has_winner: false,
    prizes: []
  },
  {
    id: 1710,
    draw_id: 1710,
    date: "2025-02-11",
    numbers: [8, 22, 28, 33, 49],
    stars: [2, 11],
    has_winner: false,
    prizes: []
  },
  {
    id: 1709,
    draw_id: 1709,
    date: "2025-02-07",
    numbers: [11, 13, 14, 34, 48],
    stars: [7, 9],
    has_winner: true,
    prizes: []
  },
  {
    id: 1708,
    draw_id: 1708,
    date: "2025-02-04",
    numbers: [5, 12, 23, 34, 46],
    stars: [5, 8],
    has_winner: false,
    prizes: []
  },
  {
    id: 1707,
    draw_id: 1707,
    date: "2025-01-31",
    numbers: [3, 6, 22, 28, 39],
    stars: [4, 5],
    has_winner: false,
    prizes: []
  },
  {
    id: 1706,
    draw_id: 1706,
    date: "2025-01-28",
    numbers: [1, 5, 20, 24, 33],
    stars: [3, 9],
    has_winner: true,
    prizes: []
  },
  {
    id: 1705,
    draw_id: 1705,
    date: "2025-01-24",
    numbers: [14, 25, 36, 44, 49],
    stars: [7, 10],
    has_winner: false,
    prizes: []
  },
  {
    id: 1704,
    draw_id: 1704,
    date: "2025-01-21",
    numbers: [2, 14, 32, 35, 43],
    stars: [8, 9],
    has_winner: false,
    prizes: []
  },
  {
    id: 1703,
    draw_id: 1703,
    date: "2025-01-17",
    numbers: [8, 26, 35, 43, 47],
    stars: [1, 9],
    has_winner: false,
    prizes: []
  },
  {
    id: 1702,
    draw_id: 1702,
    date: "2025-01-14",
    numbers: [3, 16, 22, 29, 44],
    stars: [6, 9],
    has_winner: true,
    prizes: []
  },
  {
    id: 1701,
    draw_id: 1701,
    date: "2025-01-10",
    numbers: [4, 15, 23, 30, 39],
    stars: [1, 12],
    has_winner: false,
    prizes: []
  },
  {
    id: 1700,
    draw_id: 1700,
    date: "2025-01-07",
    numbers: [8, 28, 30, 31, 46],
    stars: [9, 10],
    has_winner: false,
    prizes: []
  },
  {
    id: 1699,
    draw_id: 1699,
    date: "2025-01-03",
    numbers: [4, 15, 35, 47, 50],
    stars: [4, 8],
    has_winner: false,
    prizes: []
  },
  // --- END 2025 Updates ---

  {
    id: 1698,
    draw_id: 1698,
    date: "2024-12-31",
    numbers: [7, 18, 22, 30, 45],
    stars: [2, 11],
    has_winner: false,
    prizes: []
  },
  {
    id: 1697,
    draw_id: 1697,
    date: "2024-12-27",
    numbers: [3, 10, 25, 33, 41],
    stars: [6, 9],
    has_winner: false,
    prizes: []
  },
  {
    id: 1696,
    draw_id: 1696,
    date: "2024-12-24",
    numbers: [1, 16, 21, 38, 42],
    stars: [4, 8],
    has_winner: false,
    prizes: []
  },
  {
    id: 1695,
    draw_id: 1695,
    date: "2024-12-20",
    numbers: [9, 15, 20, 29, 36],
    stars: [3, 10],
    has_winner: true,
    prizes: []
  },
  {
    id: 1694,
    draw_id: 1694,
    date: "2024-12-17",
    numbers: [4, 12, 19, 27, 44],
    stars: [5, 7],
    has_winner: false,
    prizes: []
  },
  {
    id: 1693,
    draw_id: 1693,
    date: "2024-12-13",
    numbers: [2, 8, 17, 31, 49],
    stars: [1, 12],
    has_winner: false,
    prizes: []
  },
  {
    id: 1692,
    draw_id: 1692,
    date: "2024-12-10",
    numbers: [5, 14, 23, 35, 40],
    stars: [6, 11],
    has_winner: true,
    prizes: []
  },
  {
    id: 1691,
    draw_id: 1691,
    date: "2024-12-06",
    numbers: [2, 7, 13, 22, 43],
    stars: [1, 9],
    has_winner: false,
    prizes: []
  },
  {
    id: 1690,
    draw_id: 1690,
    date: "2024-12-03",
    numbers: [11, 28, 30, 32, 45],
    stars: [10, 11],
    has_winner: true,
    prizes: []
  },
  {
    id: 1689,
    draw_id: 1689,
    date: "2024-11-29",
    numbers: [15, 20, 29, 39, 48],
    stars: [1, 7],
    has_winner: false,
    prizes: []
  },
  {
    id: 1688,
    draw_id: 1688,
    date: "2024-11-26",
    numbers: [3, 13, 27, 30, 46],
    stars: [1, 2],
    has_winner: false,
    prizes: []
  },
  {
    id: 1687,
    draw_id: 1687,
    date: "2024-11-22",
    numbers: [2, 18, 26, 33, 47],
    stars: [3, 9],
    has_winner: true,
    prizes: []
  }
];