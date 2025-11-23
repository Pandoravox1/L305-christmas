import { FAQItem, NavItem, PotluckItem } from "./types";

export const TARGET_DATE = "2025-12-12T12:00:00";
export const TARGET_SANTA_DEADLINE = "2025-12-10T23:59:00";

export const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", path: "/" },
  { label: "Detail Acara", path: "/#details" },
  { label: "Potluck", path: "/potluck" },
  { label: "Secret Santa", path: "/secret-santa" },
];

export const INITIAL_POTLUCK_ITEMS: PotluckItem[] = [];

export const SANTA_FAQS: FAQItem[] = [
  {
    question: "Bagaimana jika aku tidak kenal orang yang kudapat?",
    answer: "Itu bagian serunya! Coba cari tahu minat mereka lewat teman-teman. Tujuannya saling perhatian dan bersenang-senang.",
  },
  {
    question: "Kapan dan di mana tukar kado berlangsung?",
    answer: "Tukar kado diadakan saat perayaan Natal utama pada 20 Desember. Waktu kumpul pukul 20.30 WIB.",
  },
  {
    question: "Siapa yang bisa dihubungi kalau ada masalah?",
    answer: "Hubungi panitia kelas, Jane Doe, melalui grup kelas untuk pertanyaan atau kendala seputar Secret Santa.",
  },
];
