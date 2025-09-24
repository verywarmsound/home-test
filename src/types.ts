export interface CurrencyRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface ExchangeRatesData {
  date: string;
  sequenceNumber: number;
  rates: CurrencyRate[];
}

export interface ConversionResult {
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  date: string;
}

export interface CurrencyOption {
  code: string;
  name: string;
  rate: number;
  amount: number;
}
