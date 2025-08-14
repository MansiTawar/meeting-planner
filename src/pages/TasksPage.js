// Filename: src/components/TasksPage.js
// --- This is the complete, updated code with UI fixes and status sorting ---

import React, { useState, useMemo } from 'react';
import { LuPlus, LuArrowUpDown } from "react-icons/lu"; // Added LuChevronDown
import CreateTaskModal from '../components/task/CreateTaskModal';

const initialTasks = [
    { id: 1, title: 'Draft initial project proposal', assignedTo: 'Alice Johnson', deadline: '2025-08-15', status: 'Completed' },
    { id: 2, title: 'Set up frontend development environment', assignedTo: 'You (John Doe)', deadline: '2025-08-18', status: 'In Progress' },
    { id: 3, title: 'Design database schema for tasks', assignedTo: 'Bob Williams', deadline: '2025-08-20', status: 'Pending' },
    { id: 4, title: 'Create user authentication endpoints', assignedTo: 'Charlie Brown', deadline: '2025-08-22', status: 'Pending' },
    { id: 5, title: 'Develop UI for the main dashboard', assignedTo: 'You (John Doe)', deadline: '2025-08-25', status: 'In Progress' },
];

const StatusBadge = ({ status }) => {
    const statusClasses = {
        'Completed': 'bg-green-100 text-green-800',
        'In Progress': 'bg-yellow-100 text-yellow-800',
        'Pending': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const TasksPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState(initialTasks);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'deadline', direction: 'ascending' });
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortIndicator, setSortIndicator] = useState('');

    const handleAddTask = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const directionText = direction.charAt(0).toUpperCase() + direction.slice(1);
        setSortIndicator(`Sorted ${directionText}`);
        setTimeout(() => {
            setSortIndicator('');
        }, 2000);
    };

    const filteredAndSortedTasks = useMemo(() => {
        let processedTasks = [...tasks].filter(task => {
            const statusMatch = statusFilter === 'All' || task.status === statusFilter;
            const searchMatch = searchQuery === '' ||
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.deadline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.status.toLowerCase().includes(searchQuery.toLowerCase());
            return statusMatch && searchMatch;
        });

        if (sortConfig.key !== null) {
            processedTasks.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return processedTasks;
    }, [tasks, searchQuery, sortConfig, statusFilter]);

    return (
        <>
            <div className="flex flex-col h-full">
                <header className="mb-6"><h1 className="text-4xl font-bold text-slate-800">Welcome, John Doe</h1></header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-medium text-slate-500">Upcoming Meetings</h3><p className="text-5xl font-bold text-slate-800 mt-2">3</p></div>
                    <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-medium text-slate-500">Today's Tasks</h3><p className="text-5xl font-bold text-slate-800 mt-2">{tasks.length}</p></div>
                </div>

                <div className="flex-grow bg-white p-6 rounded-lg shadow-md relative">
                    {sortIndicator && (
                        <div className="absolute top-6 right-6 bg-slate-800 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg transition-opacity duration-300 ease-in-out">{sortIndicator}</div>
                    )}
                    
                    {/* --- KEY CHANGE: Filter and Action controls are now grouped above the table --- */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">Tasks List</h2>
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
                                Create Task
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b-2 border-slate-200">
                                <tr>
                                    {/* --- KEY CHANGE: Status header is now a sortable button --- */}
                                    <th className="p-3 text-sm font-semibold text-slate-500">
                                        <button onClick={() => requestSort('status')} className="flex items-center gap-1 hover:text-slate-800">Status <LuArrowUpDown size={14} /></button>
                                    </th>
                                    <th className="p-3 text-sm font-semibold text-slate-500">
                                        <button onClick={() => requestSort('title')} className="flex items-center gap-1 hover:text-slate-800">Task Title <LuArrowUpDown size={14} /></button>
                                    </th>
                                    <th className="p-3 text-sm font-semibold text-slate-500">
                                        <button onClick={() => requestSort('assignedTo')} className="flex items-center gap-1 hover:text-slate-800">Assigned To <LuArrowUpDown size={14} /></button>
                                    </th>
                                    <th className="p-3 text-sm font-semibold text-slate-500">
                                        <button onClick={() => requestSort('deadline')} className="flex items-center gap-1 hover:text-slate-800">Deadline <LuArrowUpDown size={14} /></button>
                                    </th>
                                    <th className="p-3 text-sm font-semibold text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedTasks.map((task) => (
                                    <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-3"><StatusBadge status={task.status} /></td>
                                        <td className="p-3 font-medium text-slate-800">{task.title}</td>
                                        <td className="p-3 text-slate-600">{task.assignedTo}</td>
                                        <td className="p-3 text-slate-600">{task.deadline}</td>
                                        <td className="p-3"><button className="text-teal-600 hover:underline font-semibold">Details</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateTaskModal isVisible={showModal} onClose={() => setShowModal(false)} onAddTask={handleAddTask} />
        </>
    );
};

export default TasksPage;