export type NavItem = {
  label: string;
  path: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type PotluckCategory = 'all' | 'appetizer' | 'main-course' | 'dessert' | 'beverage';

export interface PotluckItem {
  id: string;
  bringerName: string;
  foodName: string;
  category: Exclude<PotluckCategory, 'all'>;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
