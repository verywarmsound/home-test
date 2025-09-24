import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import {
  GlobalStyle,
  Container,
  Header,
  Title,
  Subtitle,
  Section,
  SectionTitle,
} from './styles/globalStyles';
import { theme } from './styles/theme';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useCurrencyRates } from './hooks/useCurrencyRates';
import { ExchangeRatesList } from './components/ExchangeRatesList';
import { CurrencyConverter } from './components/CurrencyConverter';
import { LoadingCard } from './components/LoadingState';
import { ErrorCard } from './components/ErrorState';

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  width: 90vw;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    width: 95vw;
    padding: 0 1rem;
  }

  @media (min-width: 769px) {
    gap: 3rem;
    width: 85vw;
  }

  @media (min-width: 1024px) {
    gap: 4rem;
    width: 80vw;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  width: 100%;
`;

const RightColumn = styled.div`
  flex: 1;
  width: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0;
`;

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const CurrencyApp: React.FC = () => {
  const { data, rates, currencyOptions, ratesMap, isLoading, isError, error, refetch } =
    useCurrencyRates();
  if (isLoading) {
    return (
      <Container>
        <LoadingCard message="Fetching latest exchange rates from Czech National Bank" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorCard error={error as Error} onRetry={() => refetch()} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>CZK Exchange Rates</Title>
        <Subtitle>Current exchange rates from the Czech National Bank</Subtitle>
      </Header>

      <MainContent>
        <MainLayout>
          <LeftColumn>
            <Section>
              <SectionTitle>Currency Converter</SectionTitle>
              <CurrencyConverter
                currencyOptions={currencyOptions}
                ratesMap={ratesMap}
                date={data?.date || ''}
              />
            </Section>
          </LeftColumn>

          <RightColumn>
            <Section>
              <SectionTitle>Exchange Rates</SectionTitle>
              <ExchangeRatesList rates={rates} date={data?.date || ''} isLoading={isLoading} />
            </Section>
          </RightColumn>
        </MainLayout>
      </MainContent>
    </Container>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <CurrencyApp />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
