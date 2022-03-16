import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='examplePath' component={'exampleImportedComponent'} />
      </Switch>
    </Router>
  );
}

export default App;
