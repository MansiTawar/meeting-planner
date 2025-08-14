// Filename: src/components/CreateTaskModal.js
// --- This is the complete, corrected code for the modal ---

import React, { useState, useEffect } from 'react';
import { LuX, LuCloudUpload } from 'react-icons/lu'; // Corrected icon name

const CreateTaskModal = ({ isVisible, onClose, onAddTask, taskToEdit, onUpdateTask }) => {
  const isEditMode = Boolean(taskToEdit);

  const [formData, setFormData] = useState({
    title: '', description: '', assignedTo: '', department: '', deadline: '', status: 'Pending',
  });
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        assignedTo: taskToEdit.assignedTo,
        department: taskToEdit.department || '',
        deadline: taskToEdit.deadline,
        status: taskToEdit.status,
      });
    } else {
      setFormData({
        title: '', description: '', assignedTo: '', department: '', deadline: '', status: 'Pending',
      });
      setFileName('');
    }
  }, [taskToEdit, isVisible]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFileName(e.target.files[0] ? e.target.files[0].name : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Task title is required.');
      return;
    }
    if (isEditMode) {
      onUpdateTask({ ...taskToEdit, ...formData });
    } else {
      onAddTask(formData);
    }
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={onClose}><LuX size={30} /></button>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-slate-700 font-medium mb-1">Task Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-slate-700 font-medium mb-1">Task Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="assignedTo" className="block text-slate-700 font-medium mb-1">Assigned To</label>
                <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="">Select Employee</option><option value="Alice Johnson">Alice Johnson</option><option value="Bob Williams">Bob Williams</option><option value="Charlie Brown">Charlie Brown</option><option value="You (John Doe)">You (John Doe)</option>
                </select>
              </div>
              <div>
                <label htmlFor="department" className="block text-slate-700 font-medium mb-1">Department</label>
                <select name="department" value={formData.department} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="">Select Department</option><option value="Engineering">Engineering</option><option value="Marketing">Marketing</option><option value="HR">HR</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="deadline" className="block text-slate-700 font-medium mb-1">Deadline</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              {isEditMode && (
                <div>
                  <label htmlFor="status" className="block text-slate-700 font-medium mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
                  </select>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-slate-700 font-medium mb-1">Attach File (Optional)</label>
              <label htmlFor="file-upload" className="w-full flex items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                <LuCloudUpload className="w-6 h-6 text-slate-500 mr-3" />
                <span className="text-slate-600">{fileName || 'Click to upload a file'}</span>
              </label>
              <input id="file-upload" name="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600">{isEditMode ? 'Save Changes' : 'Create Task'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;