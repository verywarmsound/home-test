import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  Code,
  Button,
} from '../styles/globalStyles';
import type { CurrencyRate } from '../types';
import { formatCurrency } from '../utils/currencyParser';
import { theme } from '../styles/theme';

interface ExchangeRatesListProps {
  rates: CurrencyRate[];
  date: string;
  isLoading: boolean;
}

const StyledCard = styled(Card)`
  margin-bottom: ${theme.spacing['2xl']};
`;

const DateInfo = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.sm};
`;

const RateAmount = styled.span`
  font-family: ${theme.fonts.mono};
  font-weight: 500;
`;

const CurrencyCode = styled(Code)`
  margin-left: ${theme.spacing.sm};
  font-weight: 600;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.gray[200]};
`;

const StyledTable = styled(Table)`
  margin: 0;
`;

const LoadingTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.fontSizes.sm};
`;

const HeaderWithToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled(Button)`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
`;

const CollapsibleContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${(props) => (props.isExpanded ? 'none' : '300px')};
  overflow: ${(props) => (props.isExpanded ? 'visible' : 'hidden')};
  position: relative;

  ${(props) =>
    !props.isExpanded &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(transparent, white);
      pointer-events: none;
    }
  `}
`;

export const ExchangeRatesList: React.FC<ExchangeRatesListProps> = ({ rates, date, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Memoized sorted rates for better performance
  const sortedRates = useMemo(() => {
    return [...rates].sort((a, b) => a.code.localeCompare(b.code));
  }, [rates]);

  const formatRate = useMemo(() => {
    return (rate: number, amount: number) => {
      const perUnit = rate / amount;
      return formatCurrency(perUnit, 4);
    };
  }, []);

  return (
    <StyledCard>
      <CardHeader>
        <HeaderWithToggle>
          <div>
            <CardTitle>Current Exchange Rates</CardTitle>
            {date && <DateInfo>Last updated: {date}</DateInfo>}
            <DateInfo>Rates shown as CZK per 1 unit of foreign currency</DateInfo>
          </div>
          <ToggleButton variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : 'Show All'}
          </ToggleButton>
        </HeaderWithToggle>
      </CardHeader>

      <CardContent>
        <CollapsibleContent isExpanded={isExpanded}>
          <TableWrapper>
            {isLoading ? (
              <LoadingTable>Loading exchange rates...</LoadingTable>
            ) : (
              <StyledTable>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Currency</TableHeaderCell>
                    <TableHeaderCell>Country</TableHeaderCell>
                    <TableHeaderCell>Rate</TableHeaderCell>
                    <TableHeaderCell>Per Unit</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {sortedRates.map((rate) => (
                    <TableRow key={rate.code}>
                      <TableCell>
                        {rate.currency}
                        <CurrencyCode>{rate.code}</CurrencyCode>
                      </TableCell>
                      <TableCell>{rate.country}</TableCell>
                      <TableCell>
                        <RateAmount>{formatCurrency(rate.rate)} CZK</RateAmount>
                        {rate.amount !== 1 && (
                          <span
                            style={{ color: theme.colors.gray[500], fontSize: theme.fontSizes.xs }}
                          >
                            {' '}
                            per {rate.amount}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <RateAmount>{formatRate(rate.rate, rate.amount)} CZK</RateAmount>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sortedRates.length === 0 && !isLoading && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        style={{ textAlign: 'center', color: theme.colors.gray[500] }}
                      >
                        No exchange rates available
                      </TableCell>
                    </TableRow>
                  )}
                </tbody>
              </StyledTable>
            )}
          </TableWrapper>
        </CollapsibleContent>
      </CardContent>
    </StyledCard>
  );
};
