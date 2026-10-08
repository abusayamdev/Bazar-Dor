import type { ProductUnit } from "@/types";

export const bengaliNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

export const unitLabels: Record<ProductUnit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function formatPrice(value: number) {
  return `৳${bengaliNumber.format(value)}`;
}

export function getAveragePrice(min: number, max: number) {
  return (min + max) / 2;
}
