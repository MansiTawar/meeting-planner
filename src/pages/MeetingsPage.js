import React, { useState, useMemo } from 'react';
import { LuPlus, LuArrowUpDown, LuVideo, LuBuilding } from "react-icons/lu";
import CreateMeetingModal from '../components/meeting/CreateMeetingModal';

const initialMeetings = [
    { id: 1, title: 'Project Kickoff', date: '2025-09-01', time: '10:00 AM', mode: 'Online', department: 'Engineering' },
    { id: 2, title: 'Marketing Strategy', date: '2025-09-01', time: '11:00 AM', mode: 'Online', department: 'Marketing' },
    { id: 3, title: 'Weekly Sync', date: '2025-09-03', time: '02:30 PM', mode: 'Offline', department: 'General' },
    { id: 4, title: 'HR Policy Review', date: '2025-09-05', time: '01:00 PM', mode: 'Offline', department: 'Human Resources' },
];

// A small component to render a badge for the meeting mode
const ModeBadge = ({ mode }) => {
    const isOnline = mode === 'Online';
    const badgeClasses = isOnline ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
    const Icon = isOnline ? LuVideo : LuBuilding;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${badgeClasses}`}>
            <Icon size={12} />
            {mode}
        </span>
    );
};

const MeetingsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [meetings, setMeetings] = useState(initialMeetings);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

    const handleAddMeeting = (newMeeting) => {
        setMeetings([newMeeting, ...meetings]);
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedMeetings = useMemo(() => {
        let processedMeetings = [...meetings].filter(meeting =>
            meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meeting.department.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortConfig.key !== null) {
            processedMeetings.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return processedMeetings;
    }, [meetings, searchQuery, sortConfig]);

    return (
        <>
            <div className="flex flex-col h-full">
                {/* Header and summary cards remain the same for UI consistency */}
                <header className="mb-6"><h1 className="text-4xl font-bold text-slate-800">Welcome, John Doe</h1></header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-medium text-slate-500">Upcoming Meetings</h3><p className="text-5xl font-bold text-slate-800 mt-2">3</p></div>
                    <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-medium text-slate-500">Total Meetings</h3><p className="text-5xl font-bold text-slate-800 mt-2">{meetings.length}</p></div>
                </div>

                <div className="flex-grow bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">Meetings List</h2>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-48 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button onClick={() => setShowModal(true)} className="flex items-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600">
                                <LuPlus className="mr-2" />
                                Create Meeting
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b-2 border-slate-200">
                                <tr>
                                    <th className="p-3 text-sm font-semibold text-slate-500"><button onClick={() => requestSort('title')} className="flex items-center gap-1 hover:text-slate-800">Title <LuArrowUpDown size={14} /></button></th>
                                    <th className="p-3 text-sm font-semibold text-slate-500"><button onClick={() => requestSort('date')} className="flex items-center gap-1 hover:text-slate-800">Date <LuArrowUpDown size={14} /></button></th>
                                    <th className="p-3 text-sm font-semibold text-slate-500"><button onClick={() => requestSort('time')} className="flex items-center gap-1 hover:text-slate-800">Time <LuArrowUpDown size={14} /></button></th>
                                    <th className="p-3 text-sm font-semibold text-slate-500"><button onClick={() => requestSort('mode')} className="flex items-center gap-1 hover:text-slate-800">Mode <LuArrowUpDown size={14} /></button></th>
                                    <th className="p-3 text-sm font-semibold text-slate-500"><button onClick={() => requestSort('department')} className="flex items-center gap-1 hover:text-slate-800">Department <LuArrowUpDown size={14} /></button></th>
                                    <th className="p-3 text-sm font-semibold text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedMeetings.map((meeting) => (
                                    <tr key={meeting.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-3 font-medium text-slate-800">{meeting.title}</td>
                                        <td className="p-3 text-slate-600">{meeting.date}</td>
                                        <td className="p-3 text-slate-600">{meeting.time}</td>
                                        <td className="p-3"><ModeBadge mode={meeting.mode} /></td>
                                        <td className="p-3 text-slate-600">{meeting.department}</td>
                                        <td className="p-3"><button className="text-teal-600 hover:underline font-semibold">Details</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateMeetingModal isVisible={showModal} onClose={() => setShowModal(false)} onAddMeeting={handleAddMeeting} />
        </>
    );
};

export default MeetingsPage;