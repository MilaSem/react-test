import { Component, SyntheticEvent } from 'react';

class ButtonToBreak extends Component {
  state = {
    hasError: false,
    error: '',
  };

  handleError = (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState({
      hasError: true,
      error: 'error in buttonTemp',
    });
  };

  render() {
    const { hasError, error } = this.state;

    if (hasError) throw new Error(error);

    return (
      <button className="error__button" onClick={this.handleError}>
        To break!
      </button>
    );
  }
}

export { ButtonToBreak };
