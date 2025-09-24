import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Button } from '../styles/globalStyles';
import { theme } from '../styles/theme';

interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
  title?: string;
  description?: string;
  showDetails?: boolean;
}

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const ErrorTitle = styled.h3`
  color: ${theme.colors.red[600]};
  margin-bottom: ${theme.spacing[2]};
  font-size: ${theme.fontSizes.lg};
`;

const ErrorDescription = styled.p`
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing[4]};
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin-top: ${theme.spacing[4]};
  text-align: left;
  background: ${theme.colors.gray[50]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[3]};

  summary {
    cursor: pointer;
    font-weight: 500;
    color: ${theme.colors.gray[700]};
    margin-bottom: ${theme.spacing[2]};

    &:hover {
      color: ${theme.colors.black};
    }
  }

  pre {
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.gray[700]};
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    background: ${theme.colors.white};
    padding: ${theme.spacing[2]};
    border-radius: ${theme.borderRadius.sm};
    border: 1px solid ${theme.colors.gray[200]};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${theme.spacing[4]};
`;

const getErrorMessage = (error: Error | null): { title: string; description: string } => {
  if (!error) {
    return {
      title: 'Unknown Error',
      description: 'An unexpected error occurred.',
    };
  }

  const message = error.message.toLowerCase();

  if (message.includes('timeout') || message.includes('not responding')) {
    return {
      title: 'Connection Timeout',
      description:
        'The Czech National Bank API is not responding. This might be due to high traffic or maintenance. Please try again later.',
    };
  }

  if (message.includes('network') || message.includes('fetch')) {
    return {
      title: 'Network Error',
      description:
        'Unable to connect to the exchange rate service. Please check your internet connection and try again.',
    };
  }

  if (message.includes('server error') || message.includes('500')) {
    return {
      title: 'Server Error',
      description: 'The Czech National Bank API is experiencing issues. Please try again later.',
    };
  }

  if (message.includes('not found') || message.includes('404')) {
    return {
      title: 'Service Unavailable',
      description: 'The exchange rate data is currently unavailable. Please try again later.',
    };
  }

  if (message.includes('invalid cnb data format')) {
    return {
      title: 'Data Format Error',
      description:
        'The exchange rate data received from the Czech National Bank has an unexpected format. Please try refreshing the page.',
    };
  }

  return {
    title: 'Error Loading Exchange Rates',
    description: 'There was a problem loading the current exchange rates. Please try again.',
  };
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  title: customTitle,
  description: customDescription,
  showDetails = true,
}) => {
  const { title, description } = getErrorMessage(error);
  const finalTitle = customTitle || title;
  const finalDescription = customDescription || description;

  const handleRetry = useCallback(() => {
    onRetry?.();
  }, [onRetry]);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <ErrorContainer>
      <ErrorTitle>{finalTitle}</ErrorTitle>
      <ErrorDescription>{finalDescription}</ErrorDescription>

      <ButtonGroup>
        {onRetry && (
          <Button onClick={handleRetry} variant="primary">
            Try Again
          </Button>
        )}
        <Button onClick={handleReload} variant="outline">
          Reload Page
        </Button>
      </ButtonGroup>

      {showDetails && error && (
        <ErrorDetails>
          <summary>Technical Details</summary>
          <pre>
            Error: {error.message}
            {error.stack && `\n\nStack trace:\n${error.stack}`}
          </pre>
        </ErrorDetails>
      )}
    </ErrorContainer>
  );
};

export const ErrorCard: React.FC<ErrorStateProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <ErrorState {...props} />
      </CardContent>
    </Card>
  );
};
