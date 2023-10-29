import { Component, SyntheticEvent, PropsWithChildren } from 'react';

class ErrorBoundary extends Component<PropsWithChildren> {
  state = {
    hasError: false,
    error: '',
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  handleError = (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState({
      hasError: false,
    });
  };

  render() {
    const { hasError } = this.state;

    return (
      <div>
        {hasError ? (
          <>
            <p className="error__text">Oops, something went wrong...</p>
            <button className="error__button" onClick={this.handleError}>
              To fix!
            </button>
          </>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

export { ErrorBoundary };
