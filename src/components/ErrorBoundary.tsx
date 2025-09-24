import { Component, type ErrorInfo, type ReactNode } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Button } from '../styles/globalStyles';
import { theme } from '../styles/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing[8]} ${theme.spacing[4]};
`;

const ErrorTitle = styled.h2`
  color: ${theme.colors.red[600]};
  margin-bottom: ${theme.spacing[2]};
`;

const ErrorDescription = styled.p`
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing[6]};
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
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
    margin-bottom: ${theme.spacing[2]};
  }

  pre {
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.gray[700]};
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card>
          <CardContent>
            <ErrorContainer>
              <ErrorTitle>Something went wrong</ErrorTitle>
              <ErrorDescription>
                An unexpected error occurred while loading the currency exchange application. Please
                try refreshing the page or contact support if the problem persists.
              </ErrorDescription>

              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing[3],
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Button onClick={this.handleReset} variant="outline">
                  Try Again
                </Button>
                <Button onClick={this.handleReload}>Reload Page</Button>
              </div>

              {this.state.error && (
                <ErrorDetails>
                  <summary>Technical Details</summary>
                  <pre>
                    {this.state.error.name}: {this.state.error.message}
                    {this.state.error.stack && `\n\nStack trace:\n${this.state.error.stack}`}
                  </pre>
                </ErrorDetails>
              )}
            </ErrorContainer>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
