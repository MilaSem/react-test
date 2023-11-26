import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';

import React from 'react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { AllTheProviders };
