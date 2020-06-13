import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Consumer from './views/Consumer';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path='/' component={Consumer} />
          <AuthProvider>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          </AuthProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
