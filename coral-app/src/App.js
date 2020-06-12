import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Consumer from './views/Consumer';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
const Dashboard = React.lazy(() => import('./views/Dashboard'));

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AuthProvider>
            <Route exact path='/' component={Consumer} />
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
