import { createBrowserRouter } from 'react-router-dom';
import { AllRoutes } from './routes';
import { FormHook } from '../components/FormHook';
import { FormUncontrolled } from '../components/FormUncontrolled';
import { Page404 } from '../components/Page404';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: AllRoutes.main.path,
    element: <App />,
  },
  {
    path: AllRoutes.formUncontrolled.path,
    element: <FormUncontrolled />,
  },
  {
    path: AllRoutes.formHooked.path,
    element: <FormHook />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);
