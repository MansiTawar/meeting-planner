// Filename: src/components/TasksPage.js
import React, { useState } from 'react'; // Import useState
import { LuPlus } from "react-icons/lu";
import CreateTaskModal from './CreateTaskModal'; // Import the new modal component

const TasksPage = () => {
  // Create a state variable to control the modal's visibility.
  // 'showModal' holds the current state (true or false).
  // 'setShowModal' is the function we use to update the state.
  const [showModal, setShowModal] = useState(false);

  return (
    <> {/* Use a Fragment to wrap multiple root elements */}
      <div className="flex flex-col h-full">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-slate-800">Welcome, John Doe</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-slate-500">Upcoming Meetings</h3>
            <p className="text-5xl font-bold text-slate-800 mt-2">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-slate-500">Today's Tasks</h3>
            <p className="text-5xl font-bold text-slate-800 mt-2">5</p>
          </div>
        </div>
        <div className="flex-grow bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Tasks List</h2>
            {/* This button now opens the modal by setting showModal to true */}
            <button 
              onClick={() => setShowModal(true)} 
              className="flex items-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600"
            >
              <LuPlus className="mr-2" />
              Create Task
            </button>
          </div>
          <div>
            <p className="text-slate-500">The list of tasks will be displayed here.</p>
          </div>
        </div>
      </div>

      {/* Render the modal component */}
      {/* Pass the state and the closing function as props */}
      <CreateTaskModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default TasksPage;