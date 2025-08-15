import React, { useState, useMemo } from 'react';
import { LuPlus, LuArrowUpDown } from "react-icons/lu";

// Import the components we are actually using
import CreateMeetingModal from '../components/meeting/CreateMeetingModal';
import ViewMeetingModal from '../components/meeting/ViewMeetingModal';
import ActionMenu from '../components/meeting/ActionMenu';
import MeetingModeBadge from '../components/meeting/MeetingModeBadge';

const initialMeetings = [
    { id: 1, title: 'Project Kickoff', date: '2025-09-01', time: '10:00 AM', mode: 'Online', link: 'https://example.com/kickoff', department: 'Engineering', attendees: ['Alice', 'Bob'], agenda: 'Discuss project goals.' },
    { id: 2, title: 'Marketing Strategy', date: '2025-09-01', time: '11:00 AM', mode: 'Online', link: 'https://example.com/strategy', department: 'Marketing', attendees: ['Charlie'], agenda: 'Brainstorm new campaign.' },
    { id: 3, title: 'Weekly Sync', date: '2025-09-03', time: '02:30 PM', mode: 'Offline', location: 'Conference Room B', department: 'General', attendees: ['Alice', 'Diana'], agenda: 'Team updates.' },
];

const MeetingsPage = () => {
    const [meetings, setMeetings] = useState(initialMeetings);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
    
    // --- Logic from TasksPage ADDED ---
    const [modeFilter, setModeFilter] = useState('All');
    const [sortIndicator, setSortIndicator] = useState('');

    // State management like TasksPage
    const [isCreateOrEditModalVisible, setCreateOrEditModalVisible] = useState(false);
    const [isViewModalVisible, setViewModalVisible] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    // --- CRUD Handlers ---
    const handleAddMeeting = (newMeeting) => { setMeetings([newMeeting, ...meetings]); };
    const handleUpdateMeeting = (updatedMeeting) => { setMeetings(meetings.map(m => m.id === updatedMeeting.id ? updatedMeeting : m)); };
    const handleDeleteMeeting = (meetingId) => {
        if (window.confirm('Are you sure you want to delete this meeting?')) {
            setMeetings(meetings.filter(m => m.id !== meetingId));
        }
    };
    
    // --- Modal Control Handlers ---
    const handleOpenCreateModal = () => { setSelectedMeeting(null); setCreateOrEditModalVisible(true); };
    const handleOpenEditModal = (meeting) => { setSelectedMeeting(meeting); setCreateOrEditModalVisible(true); };
    const handleOpenDetailsModal = (meeting) => { setSelectedMeeting(meeting); setViewModalVisible(true); };
    const handleCloseAllModals = () => { setCreateOrEditModalVisible(false); setViewModalVisible(false); setSelectedMeeting(null); };

    // --- requestSort logic UPDATED to match TasksPage ---
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        const directionText = direction.charAt(0).toUpperCase() + direction.slice(1);
        setSortIndicator(`Sorted ${directionText}`);
        setTimeout(() => setSortIndicator(''), 2000);
    };

    // --- Filtering and sorting logic UPDATED to match TasksPage ---
    const filteredAndSortedMeetings = useMemo(() => {
        let processedMeetings = [...meetings].filter(meeting =>
            (modeFilter === 'All' || meeting.mode === modeFilter) &&
            (searchQuery === '' || Object.values(meeting).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            ))
        );
        if (sortConfig.key !== null) {
            processedMeetings.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return processedMeetings;
    }, [meetings, searchQuery, sortConfig, modeFilter]);

    return (
        <>
            <div className="flex flex-col h-full">
                <header className="mb-6"><h1 className="text-4xl font-bold text-slate-800">Welcome, John Doe</h1></header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-medium text-slate-500">Upcoming Meetings</h3><p className="text-5xl font-bold text-slate-800 mt-2">3</p></div>
                    <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-medium text-slate-500">Total Meetings</h3><p className="text-5xl font-bold text-slate-800 mt-2">{meetings.length}</p></div>
                </div>

                <div className="flex-grow bg-white p-6 rounded-lg shadow-md relative">
                    {/* Sort Indicator ADDED from TasksPage */}
                    {sortIndicator && <div className="absolute top-6 right-6 bg-slate-800 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">{sortIndicator}</div>}
                    
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">Meetings List</h2>
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="Search meetings..." className="w-48 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            
                            {/* Mode Filter Dropdown ADDED from TasksPage */}
                            <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value)} className="w-32 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option value="All">All Modes</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>

                            <button onClick={handleOpenCreateModal} className="flex items-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600"><LuPlus className="mr-2" /> Create Meeting</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b-2 border-slate-200">
                                <tr>
                                    {/* Table Header structure UPDATED to match TasksPage */}
                                    {['Title', 'Date', 'Time', 'Mode', 'Department'].map(header => (
                                        <th key={header} className="p-1 text-sm font-semibold text-slate-500">
                                            <button onClick={() => requestSort(header.toLowerCase())} className="flex items-center gap-1 p-2 rounded-md hover:text-black w-full text-left">
                                                {header} <LuArrowUpDown size={14} />
                                            </button>
                                        </th>
                                    ))}
                                    <th className="p-3 text-sm font-semibold text-slate-500 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedMeetings.map((meeting) => (
                                    <tr key={meeting.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-3 font-medium text-slate-800">{meeting.title}</td>
                                        <td className="p-3 text-slate-600">{meeting.date}</td>
                                        <td className="p-3 text-slate-600">{meeting.time}</td>
                                        <td className="p-3"><MeetingModeBadge mode={meeting.mode} /></td>
                                        <td className="p-3 text-slate-600">{meeting.department}</td>
                                        <td className="p-3 text-center">
                                            <ActionMenu
                                                onViewDetails={() => handleOpenDetailsModal(meeting)}
                                                onEdit={() => handleOpenEditModal(meeting)}
                                                onDelete={() => handleDeleteMeeting(meeting.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal rendering remains the same */}
            <CreateMeetingModal 
                isVisible={isCreateOrEditModalVisible} 
                onClose={handleCloseAllModals} 
                onAddMeeting={handleAddMeeting} 
                meetingToEdit={selectedMeeting} 
                onUpdateMeeting={handleUpdateMeeting}
            />
            <ViewMeetingModal 
                isVisible={isViewModalVisible} 
                onClose={handleCloseAllModals} 
                meeting={selectedMeeting} 
            />
        </>
    );
};

export default MeetingsPage;