import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { CurrencyConverter } from '../CurrencyConverter';
import { theme } from '../../styles/theme';
import type { CurrencyOption } from '../../types';

// Mock styled-components ThemeProvider for tests
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CurrencyConverter', () => {
  const mockCurrencyOptions: CurrencyOption[] = [
    { code: 'USD', name: 'dollar (USA)', rate: 22.456, amount: 1 },
    { code: 'EUR', name: 'euro (EMU)', rate: 24.26, amount: 1 },
    { code: 'GBP', name: 'pound (United Kingdom)', rate: 28.345, amount: 1 },
  ];

  const mockRatesMap = new Map([
    ['USD', { country: 'USA', currency: 'dollar', amount: 1, code: 'USD', rate: 22.456 }],
    ['EUR', { country: 'EMU', currency: 'euro', amount: 1, code: 'EUR', rate: 24.26 }],
    ['GBP', { country: 'United Kingdom', currency: 'pound', amount: 1, code: 'GBP', rate: 28.345 }],
  ]);

  const defaultProps = {
    currencyOptions: mockCurrencyOptions,
    ratesMap: mockRatesMap,
    date: '03.Jan.2024',
  };

  it('should render currency converter form', () => {
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount in CZK')).toBeInTheDocument();
    expect(screen.getByLabelText('Convert to')).toBeInTheDocument();
  });

  it('should display conversion result for default values', () => {
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    // Default amount is 100 CZK, default currency is USD
    // 100 / 22.456 * 1 = 4.45 USD
    expect(screen.getByText(/100\.00 CZK = 4\.45 USD/)).toBeInTheDocument();
  });

  it('should update conversion when amount changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    const amountInput = screen.getByLabelText('Amount in CZK');

    // Clear and enter new amount
    await user.clear(amountInput);
    await user.type(amountInput, '200');

    // Should show updated conversion: 200 / 22.456 * 1 = 8.91 USD (rounded)
    expect(screen.getByText(/200\.00 CZK = 8\.91 USD/)).toBeInTheDocument();
  });

  it('should update conversion when currency changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    const currencySelect = screen.getByLabelText('Convert to');

    await user.selectOptions(currencySelect, 'EUR');

    // 100 / 24.260 * 1 = 4.12 EUR
    expect(screen.getByText(/100\.00 CZK = 4\.12 EUR/)).toBeInTheDocument();
  });

  it('should show validation error for invalid amount', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    const amountInput = screen.getByLabelText('Amount in CZK');

    await user.clear(amountInput);
    await user.type(amountInput, '-10');

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid amount greater than 0/)).toBeInTheDocument();
    });
  });

  it('should handle empty amount input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    const amountInput = screen.getByLabelText('Amount in CZK');

    // Clear the input
    await user.clear(amountInput);

    // Should not show conversion result when amount is empty
    expect(screen.queryByText(/CZK =/)).not.toBeInTheDocument();
  });

  it('should display rate information', () => {
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    // Should show rate info: 1 USD = 22.456 CZK (formatted to 4 decimals)
    expect(screen.getByText(/1 USD = 22\.4560 CZK/)).toBeInTheDocument();
    expect(screen.getByText('03.Jan.2024')).toBeInTheDocument();
  });

  it('should handle empty currency options', () => {
    const emptyProps = {
      ...defaultProps,
      currencyOptions: [],
      ratesMap: new Map(),
    };

    renderWithTheme(<CurrencyConverter {...emptyProps} />);

    expect(screen.getByText(/No exchange rates available for conversion/)).toBeInTheDocument();
  });
});
