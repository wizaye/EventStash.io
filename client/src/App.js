import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import LoginPage from './containers/LoginPage';
import NotFoundPage from './containers/NotFoundPage';
import { useAuth0 } from '@auth0/auth0-react';
import {BarLoader } from 'react-spinners';
import AccessDeniedPage from './containers/AccessDeniedPage';

const PrivateRoute = ({ element: Element, isAuthenticated }) => {
  return isAuthenticated ? <Element /> : <Navigate to="/access-denied" />;
};

const App = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    // Show ClimbingBoxLoader while Auth0 is checking authentication status
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <BarLoader loading={isLoading} size={100} />
      </div>
    );
  }

  if (error) {
    console.error('Authentication error:', error);
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route
          path="/dashboard/*"
          element={<PrivateRoute element={Home} isAuthenticated={isAuthenticated} />}
        />
        <Route path="/access-denied" element={<AccessDeniedPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
