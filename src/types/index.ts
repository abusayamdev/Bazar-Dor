export type PriceDirection = "up" | "down" | "flat";
export type ProductUnit = "kg" | "litre" | "dozen" | "piece";

export type PriceChange = {
  dir: PriceDirection;
  pct: number;
};

export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: ProductUnit;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};
