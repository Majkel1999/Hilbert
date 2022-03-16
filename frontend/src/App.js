import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="examplePath" component="exampleImportedComponent" />
      </Routes>
    </Router>
  );
}

export default App;
