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
    expect(screen.getByRole('checkbox', { name: /real-time conversion/i })).toBeInTheDocument();
  });

  it('should display conversion result for default values', () => {
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    // Default amount is 100 CZK, default currency is USD
    // 100 / 22.456 * 1 = 4.45 USD
    expect(screen.getByText(/4\.45 USD/)).toBeInTheDocument();
    expect(screen.getByText(/100\.00 CZK = 4\.45 USD/)).toBeInTheDocument();
  });

  it('should update conversion when amount changes in real-time mode', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    // Ensure real-time mode is enabled (should be by default)
    const realtimeCheckbox = screen.getByRole('checkbox', { name: /real-time conversion/i });
    expect(realtimeCheckbox).toBeChecked();

    const amountInput = screen.getByLabelText('Amount in CZK');

    // Clear and enter new amount
    await user.clear(amountInput);
    await user.type(amountInput, '200');

    // Wait for debounced update (300ms debounce + render time)
    await waitFor(
      () => {
        expect(screen.getByText(/8\.90 USD/)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('should update conversion when currency changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    const currencySelect = screen.getByLabelText('Convert to');

    await user.selectOptions(currencySelect, 'EUR');

    // 100 / 24.260 * 1 = 4.12 EUR
    expect(screen.getByText(/4\.12 EUR/)).toBeInTheDocument();
  });

  it('should show manual convert button when real-time mode is disabled', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    const realtimeCheckbox = screen.getByRole('checkbox', { name: /real-time conversion/i });

    // Disable real-time mode
    await user.click(realtimeCheckbox);

    expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument();
  });

  it('should handle manual conversion when real-time mode is disabled', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    // Disable real-time mode
    const realtimeCheckbox = screen.getByRole('checkbox', { name: /real-time conversion/i });
    await user.click(realtimeCheckbox);

    const amountInput = screen.getByLabelText('Amount in CZK');
    const convertButton = screen.getByRole('button', { name: /convert/i });

    // Change amount but don't expect immediate update
    await user.clear(amountInput);
    await user.type(amountInput, '500');

    // Should still show old result
    expect(screen.getByText(/4\.45 USD/)).toBeInTheDocument();

    // Click convert button
    await user.click(convertButton);

    // Now should show updated result
    // 500 / 22.456 * 1 = 22.27 USD
    expect(screen.getByText(/22\.27 USD/)).toBeInTheDocument();
  });

  it('should show error for invalid amount', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyConverter {...defaultProps} />);

    const amountInput = screen.getByLabelText('Amount in CZK');

    await user.clear(amountInput);
    await user.type(amountInput, '-10');

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid amount greater than 0/)).toBeInTheDocument();
    });
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
