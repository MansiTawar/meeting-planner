import React, { useState, useMemo } from 'react';
import ViewMeetingModal from '../components/meeting/ViewMeetingModal';
import MeetingModeBadge from '../components/meeting/MeetingModeBadge';

const initialMeetings = [
    { id: 1, title: 'Project Kickoff', date: '2025-09-01', time: '10:00 AM', mode: 'Online', department: 'Engineering' },
    { id: 2, title: 'Marketing Strategy', date: '2025-09-01', time: '11:00 AM', mode: 'Online', department: 'Marketing' },
    { id: 3, title: 'Weekly Sync', date: '2025-09-03', time: '02:30 PM', mode: 'Offline', department: 'General' },
];

const DashboardPage = () => {
    const [meetings] = useState(initialMeetings);

    // Modal state
    const [isViewModalVisible, setViewModalVisible] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    // Handlers
    const handleOpenDetailsModal = (meeting) => {
        setSelectedMeeting(meeting);
        setViewModalVisible(true);
    };

    const handleCloseAllModals = () => {
        setViewModalVisible(false);
        setSelectedMeeting(null);
    };

    // Calculate stats
    const upcomingCount = useMemo(() => meetings.length, [meetings]);
    const todayTasks = 5; // later you can hook this into Tasks state

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-4xl font-bold text-slate-800">Welcome, John Doe</h1>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-slate-500">Upcoming Meetings</h3>
                    <p className="text-5xl font-bold text-slate-800 mt-2">{upcomingCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-slate-500">Today's Tasks</h3>
                    <p className="text-5xl font-bold text-slate-800 mt-2">{todayTasks}</p>
                </div>
                {/* Third box removed since Create Meeting button is gone */}
            </div>

            {/* Recent Meetings */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Recent Meetings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-slate-200">
                            <tr>
                                <th className="p-2 text-sm font-semibold text-slate-500">Title</th>
                                <th className="p-2 text-sm font-semibold text-slate-500">Date</th>
                                <th className="p-2 text-sm font-semibold text-slate-500">Time</th>
                                <th className="p-2 text-sm font-semibold text-slate-500">Mode</th>
                                <th className="p-2 text-sm font-semibold text-slate-500">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetings.slice(0,3).map((meeting) => (
                                <tr 
                                    key={meeting.id} 
                                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                                    onClick={() => handleOpenDetailsModal(meeting)}
                                >
                                    <td className="p-2 font-medium text-slate-800">{meeting.title}</td>
                                    <td className="p-2 text-slate-600">{meeting.date}</td>
                                    <td className="p-2 text-slate-600">{meeting.time}</td>
                                    <td className="p-2"><MeetingModeBadge mode={meeting.mode} /></td>
                                    <td className="p-2 text-slate-600">{meeting.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Only View Modal remains */}
            <ViewMeetingModal 
                isVisible={isViewModalVisible} 
                onClose={handleCloseAllModals} 
                meeting={selectedMeeting} 
            />
        </div>
    );
};

export default DashboardPage;
