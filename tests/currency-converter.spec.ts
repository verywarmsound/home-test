import { test, expect } from '@playwright/test';

test.describe('Currency Converter App', () => {
  // Mock consistent API data for all tests
  const mockApiData = `03.Jan.2024 #1
Country|Currency|Amount|Code|Rate
EMU|euro|1|EUR|24.260
USA|dollar|1|USD|22.456
United Kingdom|pound|1|GBP|28.345`;

  test.beforeEach(async ({ page }) => {
    // Mock API response for consistent test data
    await page.route('**/api/cnb/daily.txt', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: mockApiData
      });
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display main interface elements', async ({ page }) => {
    await expect(page.getByTestId('converter-title')).toBeVisible();
    await expect(page.getByLabel('Amount in CZK')).toBeVisible();
    await expect(page.getByLabel('Convert to')).toBeVisible();
    
    // Check conversion result appears
    await expect(page.getByTestId('conversion-result')).toBeVisible();
    await expect(page.getByTestId('converted-amount')).toBeVisible();
    await expect(page.getByTestId('conversion-details')).toBeVisible();
  });

  test('should handle amount changes', async ({ page }) => {
    const amountInput = page.getByLabel('Amount in CZK');
    
    // Verify initial conversion exists
    await expect(page.getByTestId('conversion-details')).toBeVisible();
    
    // Change amount
    await amountInput.clear();
    await amountInput.fill('500');
    
    // Should show updated conversion with new amount
    await expect(page.getByTestId('conversion-details')).toContainText('500.00 CZK =');
  });

  test('should update result when currency is changed', async ({ page }) => {
    const currencySelect = page.getByLabel('Convert to');
    
    // Should start with USD
    await expect(page.getByTestId('converted-amount')).toContainText('USD');
    
    // Change to EUR
    await currencySelect.selectOption('EUR');
    
    // Should now show EUR
    await expect(page.getByTestId('converted-amount')).toContainText('EUR');
    await expect(page.getByTestId('exchange-rate')).toContainText('1 EUR =');
  });

  test('should show error for invalid amount', async ({ page }) => {
    const amountInput = page.getByLabel('Amount in CZK');
    
    // Enter invalid amount
    await amountInput.clear();
    await amountInput.fill('-10');
    
    // Should show error message using data-testid
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('Please enter a valid amount greater than 0');
  });

  test('should display exchange rate information', async ({ page }) => {
    // Check that rate and date information is displayed
    await expect(page.getByTestId('exchange-rate')).toBeVisible();
    await expect(page.getByTestId('exchange-rate')).toContainText('1 USD =');
    await expect(page.getByTestId('exchange-date')).toBeVisible();
    await expect(page.getByTestId('exchange-date')).toContainText('03.Jan.2024');
  });
});