import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const loading = () => {
  return <Spin />;
};

const routes = [
  {
    path: '/test',
    component: Loadable({
      loader: () => import('./test/index'),
      loading,
    })
  },
];

export default routes;