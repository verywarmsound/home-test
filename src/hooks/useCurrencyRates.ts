import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import type { ExchangeRatesData, CurrencyOption } from '../types';
import { parseCNBData, getCurrencyDisplayName } from '../utils/currencyParser';
import { CNB_API_URL } from '../const';

/**
 * Fetches CNB exchange rates data
 */
const fetchCurrencyRates = async (): Promise<ExchangeRatesData> => {
  const { data } = await axios.get(CNB_API_URL, {
    headers: { Accept: 'text/plain' },
  });

  if (typeof data !== 'string') {
    throw new Error('Invalid CNB data format - expected text response');
  }

  return parseCNBData(data);
};

/**
 * Custom hook to fetch and parse CNB exchange rates
 */
export const useCurrencyRates = () => {
  const query = useQuery({
    queryKey: ['currencyRates'],
    queryFn: fetchCurrencyRates,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour (was cacheTime)
  });

  const currencyOptions = useMemo((): CurrencyOption[] => {
    if (!query.data?.rates) return [];

    return query.data.rates
      .map((rate) => ({
        code: rate.code,
        name: getCurrencyDisplayName(rate),
        rate: rate.rate,
        amount: rate.amount,
      }))
      .sort((a, b) => a.code.localeCompare(b.code));
  }, [query.data?.rates]);

  const ratesMap = useMemo(() => {
    if (!query.data?.rates) return new Map();
    return new Map(query.data.rates.map((rate) => [rate.code, rate]));
  }, [query.data?.rates]);

  return {
    data: query.data,
    rates: query.data?.rates || [],
    currencyOptions,
    ratesMap,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isStale: query.isStale,
    refetch: query.refetch,
  };
};
