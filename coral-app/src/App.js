import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import login from './auth/login';
import signup from './auth/signup';


function App() {
  return (
    <div className="App">
    <Router>
        <Switch>
          <Route exact path="/" component={login}/>
          <Route exact path="/signup" component={signup}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
