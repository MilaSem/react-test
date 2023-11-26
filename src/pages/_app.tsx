import type { AppProps } from 'next/app';
import '@/styles/App.css';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
