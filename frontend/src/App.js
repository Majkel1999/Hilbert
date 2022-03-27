import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/Auth/RequireAuth';
import AdminBoard from './pages/AdminBoard/AdminBoard';
import Home from './pages/Home/Home';
import OpenedProject from './pages/OpenedProject/OpenedProject';
import * as routes from './constants/routes';

function App() {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Layout />}>
        {/* Available for everyone */}
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.LOGIN} element={<Auth />} />
        <Route path={routes.REGISTER} element={<Auth />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path={routes.HOME} element={<AdminBoard />} />
          <Route path={routes.PROJECT_ITEM} element={<OpenedProject />} />
          {/* <Route path="protectedRoute" element={<protectedComponent />} /> */}
        </Route>
        {/* if none of routes above --> create notFound page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
