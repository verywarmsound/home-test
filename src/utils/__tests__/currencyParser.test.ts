import {
  parseCNBData,
  convertCurrency,
  formatCurrency,
  getCurrencyDisplayName,
} from '../currencyParser';
import type { CurrencyRate } from '../../types';

describe('currencyParser', () => {
  const mockCNBData = `03.Jan.2024 #1
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123
EMU|euro|1|EUR|24.260
United Kingdom|pound|1|GBP|28.345
Japan|yen|100|JPY|16.789
USA|dollar|1|USD|22.456`;

  describe('parseCNBData', () => {
    it('should parse valid CNB data correctly', () => {
      const result = parseCNBData(mockCNBData);

      expect(result.date).toBe('03.Jan.2024');
      expect(result.sequenceNumber).toBe(1);
      expect(result.rates).toHaveLength(5);

      const audRate = result.rates.find((rate) => rate.code === 'AUD');
      expect(audRate).toEqual({
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 15.123,
      });

      const jpyRate = result.rates.find((rate) => rate.code === 'JPY');
      expect(jpyRate).toEqual({
        country: 'Japan',
        currency: 'yen',
        amount: 100,
        code: 'JPY',
        rate: 16.789,
      });
    });

    it('should throw error for invalid format', () => {
      expect(() => parseCNBData('invalid data')).toThrow('Invalid CNB data format');
    });

    it('should skip invalid lines but continue parsing', () => {
      const dataWithInvalidLine = `03.Jan.2024 #1
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123
Invalid|line|data
USA|dollar|1|USD|22.456`;

      const result = parseCNBData(dataWithInvalidLine);
      expect(result.rates).toHaveLength(2);
      expect(result.rates.map((r) => r.code)).toEqual(['AUD', 'USD']);
    });

    it('should handle empty lines', () => {
      const dataWithEmptyLines = `03.Jan.2024 #1
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123

USA|dollar|1|USD|22.456
`;

      const result = parseCNBData(dataWithEmptyLines);
      expect(result.rates).toHaveLength(2);
    });
  });

  describe('convertCurrency', () => {
    const mockRate: CurrencyRate = {
      country: 'USA',
      currency: 'dollar',
      amount: 1,
      code: 'USD',
      rate: 22.456,
    };

    const mockRateMultiple: CurrencyRate = {
      country: 'Japan',
      currency: 'yen',
      amount: 100,
      code: 'JPY',
      rate: 16.789,
    };

    it('should convert CZK to USD correctly', () => {
      const result = convertCurrency(100, mockRate);
      expect(result).toBeCloseTo(4.453, 3); // 100 / 22.456 * 1
    });

    it('should convert CZK to JPY correctly (multiple amount)', () => {
      const result = convertCurrency(100, mockRateMultiple);
      expect(result).toBeCloseTo(595.628, 3); // 100 / 16.789 * 100
    });

    it('should handle zero amount correctly', () => {
      const result = convertCurrency(0, mockRate);
      expect(result).toBe(0);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency with default 2 decimal places', () => {
      expect(formatCurrency(123.456)).toBe('123.46');
      expect(formatCurrency(0.1)).toBe('0.10');
    });

    it('should format currency with custom decimal places', () => {
      expect(formatCurrency(123.456789, 4)).toBe('123.4568');
      expect(formatCurrency(123, 0)).toBe('123');
    });

    it('should format large numbers with commas', () => {
      expect(formatCurrency(1234567.89)).toBe('1,234,567.89');
    });
  });

  describe('getCurrencyDisplayName', () => {
    it('should format display name correctly', () => {
      const rate: CurrencyRate = {
        country: 'USA',
        currency: 'dollar',
        amount: 1,
        code: 'USD',
        rate: 22.456,
      };

      expect(getCurrencyDisplayName(rate)).toBe('dollar (USA)');
    });

    it('should handle different country and currency names', () => {
      const rate: CurrencyRate = {
        country: 'United Kingdom',
        currency: 'pound',
        amount: 1,
        code: 'GBP',
        rate: 28.345,
      };

      expect(getCurrencyDisplayName(rate)).toBe('pound (United Kingdom)');
    });
  });
});
