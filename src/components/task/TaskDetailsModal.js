// Filename: src/components/TaskDetailsModal.js
import React from 'react';
import { LuX } from 'react-icons/lu';
import StatusBadge from './StatusBadge'; // We'll create this helper component

// This component receives the task object to display
const TaskDetailsModal = ({ isVisible, onClose, task }) => {
    // Don't render anything if the modal is not visible or no task is selected
    if (!isVisible || !task) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="w-[600px] flex flex-col">
                <button className="text-white text-xl place-self-end" onClick={onClose}><LuX size={30} /></button>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* Header with Title and Status */}
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-slate-800">{task.title}</h2>
                        <StatusBadge status={task.status} />
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4 text-sm">
                        <div>
                            <p className="font-semibold text-slate-500">Assigned To</p>
                            <p className="text-slate-800">{task.assignedTo}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-500">Department</p>
                            <p className="text-slate-800">{task.department}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-500">Deadline</p>
                            <p className="text-slate-800">{task.deadline}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-500">Last Updated</p>
                            <p className="text-slate-800">2025-08-14 (auto)</p>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mb-4">
                        <h3 className="font-semibold text-slate-500 text-sm mb-1">Description</h3>
                        <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">{task.description || 'No description provided.'}</p>
                    </div>

                    {/* Attachments and Progress Notes (as per SRS) */}
                    <div>
                        <h3 className="font-semibold text-slate-500 text-sm mb-1">Attachments & Notes</h3>
                        <div className="border border-slate-200 rounded-lg p-3">
                            <p className="text-slate-500">Attachment links and progress notes will appear here.</p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;