import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import login from './auth/login';
import signup from './auth/signup';
import consumer from './views/consumer';

function App() {
  return (
    <div className="App">
    <Router>
        <Switch>
          <Route exact path='/' component={consumer}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/signup" component={signup}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
