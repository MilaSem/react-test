import { useState } from 'react';

const ButtonToBreak = () => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('error in ButtonToBreak');
  }

  return (
    <button className="error__button" onClick={handleError}>
      To break!
    </button>
  );
};

export { ButtonToBreak };
