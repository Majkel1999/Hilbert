import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { authActions } from './store/Slices/auth';
import Login from './components/Auth/Login';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(authActions.retrieveStoredToken());
  }, [auth]);

  return (
    <Routes>
      <Route path="/examplePath" element={<Login />} />
    </Routes>
  );
}

export default App;
