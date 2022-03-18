import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Routes, Route } from 'react-router-dom';
import { authActions } from './store/Slices/auth';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(authActions.retrieveStoredToken());
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="examplePath" component="exampleImportedComponent" />
      </Routes>
    </Router>
  );
}

export default App;
