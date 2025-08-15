import React, { useState, useEffect } from 'react';
import { LuX } from 'react-icons/lu';

// This is the "smart" version of your modal.
// The props are updated to handle editing.
const CreateMeetingModal = ({ isVisible, onClose, onAddMeeting, meetingToEdit, onUpdateMeeting }) => {
  const initialFormState = {
    title: '',
    date: '',
    time: '',
    duration: 60,
    mode: 'Online',
    location: '',
    link: '',
    department: 'General',
    agenda: '',
    attendees: [],
    file: null,
  };

  const [formData, setFormData] = useState(initialFormState);

  // This is the key logic to determine if we are creating or editing.
  const isEditMode = Boolean(meetingToEdit);

  // This hook fills the form with the meeting's data when the modal is opened for editing.
  // Otherwise, it ensures the form is reset to its initial empty state.
  useEffect(() => {
    if (isEditMode) {
      // If a meeting object is passed, we are in edit mode.
      setFormData(meetingToEdit);
    } else {
      // Otherwise, we are creating, so use the blank form.
      setFormData(initialFormState);
    }
  }, [meetingToEdit, isVisible]); // This runs whenever the modal is opened.

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] || null });
    } else if (type === 'select-multiple') {
      const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: selectedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // If we are editing, call the update function from the main page.
      onUpdateMeeting(formData);
    } else {
      // If we are creating, call the add function.
      const newMeeting = { ...formData, id: Date.now(), status: 'Scheduled' };
      onAddMeeting(newMeeting);
    }
    onClose(); // Close the modal in both cases.
  };

  if (!isVisible) return null;

  // --- THE FORM BELOW IS EXACTLY AS YOU PROVIDED IT ---
  // The only changes are the dynamic title and button text.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {/* The title changes based on the mode */}
            {isEditMode ? 'Edit Meeting' : 'Create Meeting'}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><LuX size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Meeting Title</label>
            <input type="text" name="title" id="title" required value={formData.title} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
              <input type="date" name="date" id="date" required value={formData.date} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-slate-700">Time</label>
              <input type="time" name="time" id="time" required value={formData.time} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          
          {/* Duration and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration (in minutes)</label>
                <input type="number" name="duration" id="duration" required value={formData.duration} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-slate-700">Department</label>
              <select name="department" id="department" value={formData.department} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>General</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Human Resources</option>
              </select>
            </div>
          </div>

          {/* Meeting Mode (Radio Buttons) */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Mode</label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center"><input type="radio" name="mode" value="Online" checked={formData.mode === 'Online'} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300" /> <span className="ml-2">Online</span></label>
              <label className="flex items-center"><input type="radio" name="mode" value="Offline" checked={formData.mode === 'Offline'} onChange={handleChange} className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300" /> <span className="ml-2">Offline</span></label>
            </div>
          </div>

          {/* Conditional Location / Link Input */}
          {formData.mode === 'Online' && (
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-slate-700">Meeting Link</label>
              <input type="url" name="link" id="link" placeholder="https://zoom.us/j/..." value={formData.link || ''} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          )}
          {formData.mode === 'Offline' && (
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
              <input type="text" name="location" id="location" placeholder="e.g., Conference Room A" value={formData.location || ''} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          )}

          {/* Attendees */}
          <div>
            <label htmlFor="attendees" className="block text-sm font-medium text-slate-700">Add Attendees</label>
            <select name="attendees" id="attendees" multiple value={formData.attendees} onChange={handleChange} className="mt-1 w-full h-32 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="Alice Johnson">Alice Johnson</option>
              <option value="Bob Williams">Bob Williams</option>
              <option value="Charlie Brown">Charlie Brown</option>
              <option value="Diana Miller">Diana Miller</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">Hold Ctrl (or Cmd on Mac) to select multiple attendees.</p>
          </div>

          {/* Agenda */}
          <div>
            <label htmlFor="agenda" className="block text-sm font-medium text-slate-700">Agenda</label>
            <textarea name="agenda" id="agenda" rows="4" value={formData.agenda} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
          </div>

          {/* File Attachment */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-slate-700">Attach File (Optional)</label>
            <input type="file" name="file" id="file" onChange={handleChange} className="mt-1 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200">Cancel</button>
            <button type="submit" className="py-2 px-4 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600">
              {/* The button text changes based on the mode */}
              {isEditMode ? 'Save Changes' : 'Create Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeetingModal;