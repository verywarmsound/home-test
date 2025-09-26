# CZK Exchange Rates Application

A modern React application that displays current exchange rates from the Czech National Bank (CNB) with a built-in currency converter. Built with TypeScript, React Query, and Styled Components.
Deployed to Vercel: https://home-task-five.vercel.app

## ✨ Features

- **Real-time Exchange Rates**: Fetches latest rates from CNB API
- **Currency Converter**: Convert CZK to any supported foreign currency
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Error Handling**: Graceful error states with retry functionality
- **Performance Optimized**: Smart caching and memoization
- **Type Safe**: Full TypeScript coverage
- **Modern Stack**: React 19, Vite, React Query v5

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd home-test

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── __tests__/       # Component tests
│   ├── CurrencyConverter.tsx
│   ├── ExchangeRatesList.tsx
│   ├── ErrorBoundary.tsx
│   ├── ErrorState.tsx
│   └── LoadingState.tsx
├── hooks/               # Custom React hooks
│   └── useCurrencyRates.ts
├── styles/              # Styling and theming
│   ├── globalStyles.ts
│   └── theme.ts
├── utils/               # Utility functions
│   ├── __tests__/
│   └── currencyParser.ts
├── types.ts             # TypeScript type definitions
├── const.ts             # Application constants
└── App.tsx              # Main application component

tests/                   # End-to-end tests
└── currency-converter.spec.ts
```

## 🧪 Testing

### Unit Tests (Jest + Testing Library)

```bash
# Run all unit tests
pnpm run test:unit

# Run tests in watch mode
pnpm run test:unit:watch

# Run tests with coverage report
pnpm run test:unit:coverage
```

### End-to-End Tests (Playwright)

```bash
# Run e2e tests (headless)
pnpm run test:e2e

# Run e2e tests with browser UI
pnpm run test:e2e:headed

# Open Playwright test runner UI
pnpm run test:e2e:ui
```

### Run All Tests

```bash
pnpm run test
```

## 🛠️ Available Commands

### Development
```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
```

### Code Quality
```bash
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint issues automatically
pnpm run format       # Format code with Prettier
pnpm run format:check # Check if code is formatted
```

### Testing
```bash
pnpm run test:unit           # Run unit tests
pnpm run test:unit:watch     # Run unit tests in watch mode
pnpm run test:unit:coverage  # Run unit tests with coverage
pnpm run test:e2e           # Run end-to-end tests
pnpm run test:e2e:headed    # Run e2e tests with browser UI
pnpm run test:e2e:ui        # Open Playwright test runner
pnpm run test               # Run all tests
```

## 🏗️ Architecture

### Data Flow
1. **API Integration**: `useCurrencyRates` hook fetches data from CNB API
2. **State Management**: React Query handles caching, loading, and error states
3. **Components**: Presentational components receive processed data as props
4. **Error Boundaries**: Catch and handle runtime errors gracefully

### Key Technologies
- **React 19**: Latest React with modern features
- **TypeScript**: Full type safety and better developer experience
- **Vite**: Fast build tool and dev server
- **React Query v5**: Powerful data fetching and caching
- **Styled Components**: CSS-in-JS styling solution
- **Jest**: Unit testing framework
- **Playwright**: End-to-end testing
- **ESLint + Prettier**: Code quality and formatting

### Performance Optimizations
- **Memoization**: Strategic use of `useMemo` for expensive calculations
- **Caching**: React Query caches API responses for 30 minutes
- **Code Splitting**: Dynamic imports for better loading performance
- **Error Boundaries**: Prevent crashes and provide fallback UI

## 🔧 Configuration

### Environment Setup
The app works out of the box, but you can customize:

- **API Endpoint**: Modify `CNB_API_URL` in `src/const.ts`
- **Theme**: Customize colors and spacing in `src/styles/theme.ts`
- **Cache Duration**: Adjust React Query settings in `src/hooks/useCurrencyRates.ts`

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
```bash
pnpm run lint        # Check for linting issues
npx tsc --noEmit     # Check TypeScript errors
```

**Tests failing**
```bash
pnpm run test:unit:coverage  # Check test coverage
pnpm run lint:fix           # Fix code style issues
```

**API not loading**
- Check network connection
- CNB API might be down (shows error message with retry)
- Check browser console for CORS issues
