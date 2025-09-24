import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Card, CardContent } from '../styles/globalStyles';
import { theme } from '../styles/theme';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => {
    switch (size) {
      case 'sm':
        return theme.spacing[4];
      case 'lg':
        return theme.spacing[16];
      default:
        return theme.spacing[8];
    }
  }};
`;

const Spinner = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  border: 2px solid ${theme.colors.gray[200]};
  border-top: 2px solid ${theme.colors.black};
  border-radius: 50%;
  width: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '20px';
      case 'lg':
        return '48px';
      default:
        return '32px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '20px';
      case 'lg':
        return '48px';
      default:
        return '32px';
    }
  }};
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${theme.spacing[3]};
`;

const LoadingMessage = styled.p<{ size: 'sm' | 'md' | 'lg' }>`
  color: ${theme.colors.gray[600]};
  font-size: ${({ size }) => {
    switch (size) {
      case 'sm':
        return theme.fontSizes.xs;
      case 'lg':
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.sm;
    }
  }};
  text-align: center;
  margin: 0;
`;

const PulsingDots = styled.span`
  &::after {
    content: '';
    animation: dots 2s linear infinite;
  }

  @keyframes dots {
    0%,
    20% {
      content: '';
    }
    40% {
      content: '.';
    }
    60% {
      content: '..';
    }
    80%,
    100% {
      content: '...';
    }
  }
`;

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading', size = 'md' }) => {
  return (
    <LoadingContainer size={size}>
      <Spinner size={size} />
      <LoadingMessage size={size}>
        {message}
        <PulsingDots />
      </LoadingMessage>
    </LoadingContainer>
  );
};

export const LoadingCard: React.FC<LoadingStateProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <LoadingState {...props} />
      </CardContent>
    </Card>
  );
};
