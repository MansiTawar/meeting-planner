
// Filename: src/App.js
// --- This is the complete, corrected code with the updated import path ---
// --- This is the complete, corrected code with the updated import path ---

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all your components and pages from their correct locations
// Import all your components and pages from their correct locations
import LoginPage from './components/LoginPage';
import MainLayout from './components/include/MainLayout';
// --- UPDATED IMPORT PATH ---
// TasksPage is now imported from the 'pages' folder.
import TasksPage from './pages/TasksPage'; 
import MeetingsPage from './pages/MeetingsPage'; // Import the new page
import Dashboard from "./pages/Dashboard";


import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* The MainLayout wraps all the pages that need the sidebar */}
        
        {/* The MainLayout wraps all the pages that need the sidebar */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Default route redirects to the tasks page */}
          {/* Default route redirects to the tasks page */}
          <Route index element={<Navigate to="/tasks" replace />} />
          
          {/* The route for your newly organized TasksPage */}
          {/* The route for your newly organized TasksPage */}
          <Route path="tasks" element={<TasksPage />} />
          <Route path="meetings" element={<MeetingsPage />} /> {/* <-- ADD THE NEW ROUTE */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 
            When your teammate is ready, they can add the MeetingPage route here.
            For example:
            import MeetingsPage from './pages/MeetingsPage';
            <Route path="meetings" element={<MeetingsPage />} />
          */}
          {/* 
            When your teammate is ready, they can add the MeetingPage route here.
            For example:
            import MeetingsPage from './pages/MeetingsPage';
            <Route path="meetings" element={<MeetingsPage />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;