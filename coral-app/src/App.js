import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './views/Home';
import GetQR from './views/GetQR';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './views/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/getQR' component={GetQR} />
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
