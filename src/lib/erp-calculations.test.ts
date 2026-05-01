import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateGrossMargin, calculateGrossProfit, calculateLineCost } from './erp-calculations';

test('calculation helpers return expected values', () => {
  assert.equal(calculateLineCost(100, 4.5), 450);
  assert.equal(calculateGrossProfit(1500, 900), 600);
  assert.equal(calculateGrossMargin(600, 1500), 40);
});
