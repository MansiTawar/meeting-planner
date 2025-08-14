// Filename: src/App.js
// --- COPY AND PASTE THIS ENTIRE FILE ---

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all your components
import LoginPage from './components/LoginPage';
import MainLayout from './components/include/MainLayout';
import TasksPage from './components/TasksPage';

// You can keep this import if you have global styles in it
import './App.css'; 

function App() {
  return (
    // BrowserRouter enables routing for the entire app
    <BrowserRouter>
      {/* The Routes component is where you define all possible routes */}
      <Routes>
        
        {/* ROUTE 1: The Login Page */}
        {/* When the URL is "/login", it will render the LoginPage component */}
        <Route path="/login" element={<LoginPage />} />

        {/* ROUTE 2: The Main Application */}
        {/* This is a "layout route". It renders MainLayout (which contains the SideNavbar). */}
        {/* All nested routes will be displayed inside MainLayout's <Outlet /> */}
        <Route path="/" element={<MainLayout />}>
          
          {/* If you go to the base URL "/", it will automatically redirect you to "/tasks" */}
          <Route index element={<Navigate to="/tasks" replace />} />
          
          {/* When the URL is "/tasks", it will render TasksPage inside the MainLayout */}
          <Route path="tasks" element={<TasksPage />} />

          {/* You can add more pages here later */}
          {/* e.g., <Route path="dashboard" element={<DashboardPage />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;