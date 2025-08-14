// Filename: src/components/include/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavbar from './SideNavbar';

const MainLayout = () => {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <SideNavbar />
      <main className="flex-grow p-8">
        {/* The Outlet will render the page component, like TasksPage */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;