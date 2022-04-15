import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faCopy,
  faMinus,
  faPlusCircle,
  faTrashAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { authActions } from './store/auth/auth-slice';
import Auth from './pages/Auth/Auth';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminBoard from './pages/AdminBoard/AdminBoard';
import Home from './pages/Home/Home';
import OpenedProject from './pages/OpenedProject/OpenedProject';
import * as routes from './constants/routes';

library.add(fab, faTrashAlt, faMinus, faCopy, faXmark, faPlusCircle);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) dispatch(authActions.logout());
  }, [isLoggedIn]);

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
