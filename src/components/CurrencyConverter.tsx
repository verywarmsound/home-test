import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  FormGroup,
  Label,
  Input,
  Select,
  Code,
} from '../styles/globalStyles';
import type { CurrencyOption, ConversionResult, CurrencyRate } from '../types';
import { convertCurrency, formatCurrency } from '../utils/currencyParser';
import { theme } from '../styles/theme';

interface CurrencyConverterProps {
  currencyOptions: CurrencyOption[];
  ratesMap: Map<string, CurrencyRate>;
  date: string;
}

const ConversionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div`
  background: ${theme.colors.gray[50]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ResultAmount = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm};
  font-family: ${theme.fonts.mono};
`;

const ResultDetails = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
`;

const ConversionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

const RateInfo = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};
`;

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  currencyOptions,
  ratesMap,
  date,
}) => {
  const [amount, setAmount] = useState('100');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Memoized conversion - only recalculates when inputs change
  const conversionResult = useMemo((): ConversionResult | null => {
    const numericAmount = parseFloat(amount);
    const isValidAmount = !isNaN(numericAmount) && numericAmount > 0;

    if (!isValidAmount || !selectedCurrency) return null;

    const targetRate = ratesMap.get(selectedCurrency);
    if (!targetRate) return null;

    const convertedAmount = convertCurrency(numericAmount, targetRate);
    return {
      fromAmount: numericAmount,
      toAmount: convertedAmount,
      fromCurrency: 'CZK',
      toCurrency: selectedCurrency,
      rate: targetRate.rate / targetRate.amount,
      date,
    };
  }, [amount, selectedCurrency, ratesMap, date]);

  const isValidAmount = useMemo(() => {
    const numericAmount = parseFloat(amount);
    return !isNaN(numericAmount) && numericAmount > 0;
  }, [amount]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
      </CardHeader>

      <CardContent>
        <ConversionGrid>
          <FormGroup>
            <Label htmlFor="amount">Amount in CZK</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount in CZK"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="currency">Convert to</Label>
            <Select
              id="currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {currencyOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.code} - {option.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </ConversionGrid>

        {conversionResult && isValidAmount && (
          <ResultCard>
            <ResultAmount>
              {formatCurrency(conversionResult.toAmount, 2)} {conversionResult.toCurrency}
            </ResultAmount>

            <ResultDetails>
              {formatCurrency(conversionResult.fromAmount, 2)} CZK ={' '}
              {formatCurrency(conversionResult.toAmount, 2)} {conversionResult.toCurrency}
            </ResultDetails>

            <ConversionInfo>
              <RateInfo>
                1 {conversionResult.toCurrency} = {formatCurrency(conversionResult.rate, 4)} CZK
              </RateInfo>
              <Code>{date}</Code>
            </ConversionInfo>
          </ResultCard>
        )}

        {!isValidAmount && amount && (
          <ResultCard
            style={{ backgroundColor: theme.colors.red[50], borderColor: theme.colors.red[200] }}
          >
            <div style={{ color: theme.colors.red[600], fontSize: theme.fontSizes.sm }}>
              Please enter a valid amount greater than 0
            </div>
          </ResultCard>
        )}

        {currencyOptions.length === 0 && (
          <ResultCard style={{ backgroundColor: theme.colors.gray[50] }}>
            <div style={{ color: theme.colors.gray[600], fontSize: theme.fontSizes.sm }}>
              No exchange rates available for conversion
            </div>
          </ResultCard>
        )}
      </CardContent>
    </Card>
  );
};
