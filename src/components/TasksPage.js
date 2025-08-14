// Filename: src/components/TasksPage.js
import React from 'react';
import { LuPlus } from "react-icons/lu"; // Icon for the create button

const TasksPage = () => {
  return (
    // The main container for the page uses a flex column layout
    <div className="flex flex-col h-full">

      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-slate-800">Welcome, John Doe</h1>
      </header>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1: Upcoming Meetings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-slate-500">Upcoming Meetings</h3>
          <p className="text-5xl font-bold text-slate-800 mt-2">3</p>
        </div>
        {/* Card 2: Today's Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-slate-500">Today's Tasks</h3>
          <p className="text-5xl font-bold text-slate-800 mt-2">5</p>
        </div>
      </div>

      {/* Main Task List Panel */}
      {/* This panel creates the "bordered" look you wanted */}
      <div className="flex-grow bg-white p-6 rounded-lg shadow-md">
        
        {/* Panel Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Tasks List</h2>
          <button className="flex items-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600">
            <LuPlus className="mr-2" />
            Create Task
          </button>
        </div>

        {/* Placeholder for the actual task list/table */}
        <div>
          <p className="text-slate-500">The list of tasks will be displayed here.</p>
        </div>

      </div>
    </div>
  );
};

export default TasksPage;