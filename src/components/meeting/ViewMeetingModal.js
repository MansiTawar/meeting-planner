import React from 'react';
import { LuX, LuCalendar, LuClock, LuUsers, LuFileText, LuLink, LuMapPin, LuPaperclip } from 'react-icons/lu';
import MeetingModeBadge from './MeetingModeBadge'; // Import the new badge

// This component is now styled exactly like your TaskDetailsModal
const ViewMeetingModal = ({ isVisible, onClose, meeting }) => {
    // Don't render anything if the modal is not visible or no meeting is selected
    if (!isVisible || !meeting) return null;

    return (
        // New blurred background wrapper
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="w-[600px] flex flex-col">
                {/* External close button */}
                <button className="text-white text-xl place-self-end mb-2" onClick={onClose}>
                    <LuX size={30} />
                </button>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* Header with Title and Mode Badge */}
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-slate-800 mr-4">{meeting.title}</h2>
                        <MeetingModeBadge mode={meeting.mode} />
                    </div>

                    {/* Details Grid - styled like tasks */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4 text-sm">
                        <div>
                            <p className="font-semibold text-slate-500 flex items-center gap-1.5"><LuCalendar size={14} /> Date</p>
                            <p className="text-slate-800 pl-5">{meeting.date}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-500 flex items-center gap-1.5"><LuClock size={14} /> Time</p>
                            <p className="text-slate-800 pl-5">{meeting.time}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-500 flex items-center gap-1.5"><LuUsers size={14} /> Department</p>
                            <p className="text-slate-800 pl-5">{meeting.department}</p>
                        </div>
                        {meeting.mode === 'Online' ? (
                            <div>
                                <p className="font-semibold text-slate-500 flex items-center gap-1.5"><LuLink size={14} /> Meeting Link</p>
                                <a href={meeting.link} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline pl-5 truncate">{meeting.link || 'No link provided'}</a>
                            </div>
                        ) : (
                            <div>
                                <p className="font-semibold text-slate-500 flex items-center gap-1.5"><LuMapPin size={14} /> Location</p>
                                <p className="text-slate-800 pl-5">{meeting.location || 'No location provided'}</p>
                            </div>
                        )}
                    </div>

                    {/* Attendees Section */}
                    <div className="mb-4">
                        <h3 className="font-semibold text-slate-500 text-sm mb-1 flex items-center gap-1.5"><LuUsers size={14} /> Attendees</h3>
                        <p className="text-slate-700 bg-slate-50 p-3 rounded-lg text-sm">
                            {meeting.attendees && meeting.attendees.length > 0 ? meeting.attendees.join(', ') : 'No attendees listed.'}
                        </p>
                    </div>

                    {/* Agenda Section (like Description) */}
                    <div className="mb-4">
                        <h3 className="font-semibold text-slate-500 text-sm mb-1 flex items-center gap-1.5"><LuFileText size={14} /> Agenda</h3>
                        <p className="text-slate-700 bg-slate-50 p-3 rounded-lg text-sm">{meeting.agenda || 'No agenda provided.'}</p>
                    </div>
                    
                    {/* Attachments Section */}
                    <div>
                        <h3 className="font-semibold text-slate-500 text-sm mb-1 flex items-center gap-1.5"><LuPaperclip size={14} /> Attachments</h3>
                        <div className="border border-slate-200 rounded-lg p-3 text-sm">
                            <p className="text-slate-500">{meeting.file ? meeting.file.name : 'No attachments.'}</p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMeetingModal;