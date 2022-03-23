import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { authActions } from './store/Slices/auth';
import Login from './components/Auth/Login';
import Layout from './components/Layout/Layout';
import RequireAuth from '/components/Auth/RequireAuth';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(authActions.retrieveStoredToken());
  }, [auth]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Available for everyone */}
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          {/* <Route path="protectedRoute" element={<protectedComponent />} /> */}
        </Route>
        {/* if none of routes above --> create notFound page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
