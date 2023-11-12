import { BrowserRouter } from 'react-router-dom';

import React from 'react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export { AllTheProviders };
