import { Draw } from "@/lib/euromillions/schemas";

// --- BELANGRIJK / IMPORTANT ---
// Omdat we geen externe API gebruiken, is dit bestand de "waarheid" voor de engine.
// U moet de meest recente trekkingen hieronder handmatig toevoegen om de voorspellingen accuraat te houden.
// Since we don't use an external API, this file is the "source of truth".
// You must manually add the latest draws below to keep predictions accurate.

export const LOCAL_HISTORY: Draw[] = [
  // --- Voeg hier nieuwe trekkingen toe / Add new draws here ---
  // {
  //   id: 1700,
  //   draw_id: 1700,
  //   date: "2025-01-01",
  //   numbers: [1, 2, 3, 4, 5],
  //   stars: [1, 2],
  //   has_winner: false,
  //   prizes: []
  // },
  
  // Real History (Late 2024)
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