import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';

// import Home from '../../pages/home';
// import Add from '../../pages/add';
// import Login from '../../pages/login';
// import User from '../../pages/user';
// import Dashboard from '../../pages/dashboard';

const Home = lazy(() =>
  import('../../pages/home' /* webpackChunkName: "home" */)
);
const Add = lazy(() => import('../../pages/add' /* webpackChunkName: "add" */));
const Login = lazy(() =>
  import('../../pages/login' /* webpackChunkName: "home" */)
);
const User = lazy(() =>
  import('../../pages/user' /* webpackChunkName: "home" */)
);
const Dashboard = lazy(() =>
  import('../../pages/dashboard' /* webpackChunkName: "home" */)
);

const AppRouter = () => (
  <Suspense fallback={<p>Opps</p>}>
    <Router>
      <Home path="/" />
      <Add path="/add" />
      <Login path="/login" />
      <User path="/:username" />
      <Dashboard path="/dashboard" />
    </Router>
  </Suspense>
);

export default AppRouter;
