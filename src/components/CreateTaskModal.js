// Filename: src/components/CreateTaskModal.js
import React from 'react';
import { LuX } from 'react-icons/lu'; // Import the 'X' icon for the close button

// The component receives two props: 'isVisible' to control its visibility, and 'onClose' to handle closing it.
const CreateTaskModal = ({ isVisible, onClose }) => {
  // If the modal is not visible, don't render anything.
  if (!isVisible) return null;

  // Handle clicks on the background overlay to close the modal.
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') {
      onClose();
    }
  };

  return (
    // Main wrapper for the modal with a semi-transparent background
    <div 
      id="wrapper" 
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        {/* Button to close the modal, positioned at the top right */}
        <button className="text-white text-xl place-self-end" onClick={onClose}>
          <LuX size={30} />
        </button>
        {/* The main modal content panel */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Create New Task</h2>

          {/* Form for creating a task */}
          <form>
            {/* Task Title */}
            <div className="mb-4">
              <label htmlFor="taskTitle" className="block text-slate-700 font-medium mb-1">Task Title</label>
              <input type="text" id="taskTitle" className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>

            {/* Task Description */}
            <div className="mb-4">
              <label htmlFor="taskDescription" className="block text-slate-700 font-medium mb-1">Task Description</label>
              <textarea id="taskDescription" rows="3" className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Assigned To */}
              <div>
                <label htmlFor="assignedTo" className="block text-slate-700 font-medium mb-1">Assigned To</label>
                <select id="assignedTo" className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Select Employee</option>
                  {/* We will populate this with real data later */}
                </select>
              </div>

              {/* Deadline */}
              <div>
                <label htmlFor="deadline" className="block text-slate-700 font-medium mb-1">Deadline</label>
                <input type="date" id="deadline" className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600">Create Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;