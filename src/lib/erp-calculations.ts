export const calculateLineCost = (quantity: number, unitCost: number) => quantity * unitCost;
export const calculateLineSellingPrice = (quantity: number, unitSellingPrice: number) => quantity * unitSellingPrice;
export const calculateGrossProfit = (totalSellingPrice: number, totalCost: number) => totalSellingPrice - totalCost;
export const calculateGrossMargin = (grossProfit: number, totalSellingPrice: number) =>
  totalSellingPrice === 0 ? 0 : (grossProfit / totalSellingPrice) * 100;
export const convertCurrency = (amount: number, exchangeRate: number) => amount * exchangeRate;
export const calculateShippingCostPerUnit = (totalShippingCost: number, totalUnits: number) =>
  totalUnits === 0 ? 0 : totalShippingCost / totalUnits;
