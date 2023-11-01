import { Component, SyntheticEvent } from 'react';
import { App } from '../App';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
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
          <App />
        )}
      </div>
    );
  }
}

export { ErrorBoundary };
