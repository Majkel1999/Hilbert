import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/Auth/RequireAuth';
import AdminBoard from './pages/AdminBoard/AdminBoard';
import Home from './pages/Home/Home';
import OpenedProject from './pages/OpenedProject/OpenedProject';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Available for everyone */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AdminBoard />} />
          <Route path="/project/:id" element={<OpenedProject />} />
          {/* <Route path="protectedRoute" element={<protectedComponent />} /> */}
        </Route>
        {/* if none of routes above --> create notFound page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
