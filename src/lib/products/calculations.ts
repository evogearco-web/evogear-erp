export function computeProductCosting(unitCostRmb: number, exchangeRate: number, sellingPriceSgd: number) {
  const unitCostSgd = exchangeRate > 0 ? unitCostRmb / exchangeRate : 0;
  const grossProfitPerUnit = sellingPriceSgd - unitCostSgd;
  const grossMarginPercentage = sellingPriceSgd === 0 ? 0 : (grossProfitPerUnit / sellingPriceSgd) * 100;
  return { unitCostSgd, grossProfitPerUnit, grossMarginPercentage };
}
