export interface RouteItem {
  path: string;
  name: string;
}

export const baseRoutes = {
  main: {
    path: '/',
    name: 'Main',
  },
  formUncontrolled: {
    path: '/form1',
    name: 'Uncontrolled form',
  },
  formHooked: {
    path: '/form2',
    name: 'Hooked form',
  },
};

const routes = {
  ...baseRoutes,
};

type RouteCollection = {
  [key in keyof typeof routes]: RouteItem;
};

export const AllRoutes: RouteCollection = routes;
