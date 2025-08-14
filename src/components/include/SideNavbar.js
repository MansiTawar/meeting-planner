import React from 'react';
// NEW: Import NavLink for proper routing
import { NavLink } from 'react-router-dom';
// CHANGED: Replaced LuBarChart3 with the correct LuChartBar
import { LuLayoutDashboard, LuCalendarClock, LuListTodo, LuChartBar, LuCalendarDays  } from "react-icons/lu";

const SideNavbar = () => {
  // This function determines the class for the NavLink based on if it's active
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? 'flex items-center p-3 bg-teal-500 rounded-lg text-white' // Style for the active link
      : 'flex items-center p-3 hover:bg-slate-700 rounded-lg'; // Style for inactive links
  };

  return (
    <div className="h-screen w-64 bg-[#0B2D50] text-white flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-semibold">Meeting & Task Planner</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {/* CHANGED: Switched to NavLink and set the 'to' path */}
          <li className="mb-2">
            <NavLink to="/dashboard" className={getNavLinkClass}>
              <LuLayoutDashboard className="mr-3 w-6 h-6" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/meetings" className={getNavLinkClass}>
              <LuCalendarClock className="mr-3 w-6 h-6" />
              <span>Meetings</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/tasks" className={getNavLinkClass}>
              <LuListTodo className="mr-3 w-6 h-6" />
              <span>Tasks</span>
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to="/reports" className={getNavLinkClass}>
              <LuChartBar className="mr-3 w-6 h-6" />
              <span>Reports</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;