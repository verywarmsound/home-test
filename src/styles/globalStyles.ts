import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: ${theme.fonts.sans};
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    font-size: ${theme.fontSizes.base};
    line-height: 1.5;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }
`;

// Layout Components
export const Container = styled.div`
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-start;
`;

export const Header = styled.header`
  border-bottom: 1px solid ${theme.colors.gray[200]};
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;

  @media (min-width: 768px) {
    padding: 2rem 2rem;
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.875rem, 4vw, 2.25rem);
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: clamp(1rem, 2vw, 1.125rem);
`;

export const Section = styled.section`
  margin-bottom: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: 1rem;
  text-align: center;

  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

// Card Components
export const Card = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.sm};
`;

export const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray[100]};
`;

export const CardTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.black};
`;

export const CardContent = styled.div`
  color: ${theme.colors.gray[700]};
`;

// Button Components
export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  font-family: ${theme.fonts.sans};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: 1px solid;

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.base};
        `;
    }
  }}

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.gray[100]};
          border-color: ${theme.colors.gray[200]};
          color: ${theme.colors.gray[900]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray[200]};
            border-color: ${theme.colors.gray[300]};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          border-color: ${theme.colors.black};
          color: ${theme.colors.black};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.black};
            color: ${theme.colors.white};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.black};
          border-color: ${theme.colors.black};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.gray[800]};
            border-color: ${theme.colors.gray[800]};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${theme.colors.black};
    outline-offset: 2px;
  }
`;

// Form Components
export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

export const Label = styled.label`
  display: block;
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing.sm};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fonts.sans};
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${theme.colors.black};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[500]};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.base};
  font-family: ${theme.fonts.sans};
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 3rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.black};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &:hover:not(:disabled) {
    border-color: ${theme.colors.gray[400]};
  }

  &:disabled {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[500]};
    cursor: not-allowed;
    opacity: 0.6;
  }

  option {
    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
    padding: ${theme.spacing.sm};
  }
`;

// Status Components
export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: 50%;
  border-top-color: ${theme.colors.black};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.red[600]};
  background-color: ${theme.colors.red[50]};
  border: 1px solid ${theme.colors.red[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.lg};
`;

export const SuccessMessage = styled.div`
  color: ${theme.colors.green[600]};
  background-color: ${theme.colors.green[50]};
  border: 1px solid ${theme.colors.green[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.lg};
`;

// Table Components
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${theme.fontSizes.sm};
`;

export const TableHeader = styled.thead`
  background-color: ${theme.colors.gray[50]};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray[200]};

  &:hover {
    background-color: ${theme.colors.gray[50]};
  }
`;

export const TableHeaderCell = styled.th`
  text-align: left;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-weight: 600;
  color: ${theme.colors.gray[700]};
`;

export const TableCell = styled.td`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  color: ${theme.colors.gray[900]};
`;

export const Code = styled.code`
  font-family: ${theme.fonts.mono};
  background-color: ${theme.colors.gray[100]};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.875em;
  color: ${theme.colors.gray[800]};
`;
