import type { ExchangeRatesData, CurrencyRate } from '../types';
import { NUMBER_FORMAT } from '../const';

/**
 * Parses the CNB TXT format exchange rates data
 * Format:
 * First line: DD.MM.YYYY #sequenceNumber
 * Header line: Country|Currency|Amount|Code|Rate
 * Data lines: country|currency|amount|code|rate
 */
export const parseCNBData = (textData: string): ExchangeRatesData => {
  const lines = textData.trim().split('\n');

  if (lines.length < 3) {
    throw new Error('Invalid CNB data format: insufficient lines');
  }

  // Parse first line: "03.Jan.2000 #1"
  const firstLine = lines[0].trim();
  const dateMatch = firstLine.match(/^(.+?)\s+#(\d+)$/);

  if (!dateMatch) {
    throw new Error('Invalid CNB data format: could not parse date and sequence');
  }

  const [, dateStr, sequenceStr] = dateMatch;
  const sequenceNumber = parseInt(sequenceStr, 10);

  // Skip header line (lines[1]) and parse data lines
  const rates: CurrencyRate[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines (there might be blank lines at the end)
    if (!line) continue;

    // Split by pipe separator
    const parts = line.split('|');

    if (parts.length !== 5) {
      console.warn(`Skipping invalid line: ${line}`);
      continue;
    }

    const [country, currency, amountStr, code, rateStr] = parts;

    const amount = parseFloat(amountStr);
    const rate = parseFloat(rateStr);

    if (isNaN(amount) || isNaN(rate)) {
      console.warn(`Skipping line with invalid numbers: ${line}`);
      continue;
    }

    rates.push({
      country: country.trim(),
      currency: currency.trim(),
      amount,
      code: code.trim(),
      rate,
    });
  }

  return {
    date: dateStr,
    sequenceNumber,
    rates,
  };
};

/**
 * Converts CZK amount to target currency
 */
export const convertCurrency = (amountCZK: number, targetCurrencyRate: CurrencyRate): number => {
  // CNB rate shows how many CZK for the given amount of foreign currency
  // So to convert CZK to foreign currency: CZK / rate * amount
  return (amountCZK / targetCurrencyRate.rate) * targetCurrencyRate.amount;
};

/**
 * Formats currency amount with appropriate decimal places
 */
export const formatCurrency = (amount: number, decimals: number = 2): string => {
  return new Intl.NumberFormat(NUMBER_FORMAT, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

/**
 * Gets display name for currency (currency + country)
 */
export const getCurrencyDisplayName = (rate: CurrencyRate): string => {
  return `${rate.currency} (${rate.country})`;
};
