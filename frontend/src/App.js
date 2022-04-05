import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Auth from './pages/Auth/Auth';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminBoard from './pages/AdminBoard/AdminBoard';
import Home from './pages/Home/Home';
import OpenedProject from './pages/OpenedProject/OpenedProject';
import * as routes from './constants/routes';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path={routes.HOME} element={<Layout />}>
        {!isLoggedIn && <Route path={routes.HOME} element={<Home />} />}
        {/* Available for everyone */}
        <Route path={routes.LOGIN} element={<Auth />} />
        <Route path={routes.REGISTER} element={<Auth />} />
        {/* Requiring to be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path={routes.HOME} element={<AdminBoard />} />
          <Route path={routes.PROJECT_ITEM} element={<OpenedProject />} />
        </Route>
        {/* if none of routes above --> create notFound page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
