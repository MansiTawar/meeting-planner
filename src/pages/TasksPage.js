// Filename: src/pages/TasksPage.js
// --- This version has the updated text-only hover effect ---

import React, { useState, useMemo } from 'react';
import { LuPlus, LuArrowUpDown, LuChevronDown } from "react-icons/lu";
import CreateTaskModal from '../components/task/CreateTaskModal';
import TaskDetailsModal from '../components/task/TaskDetailsModal';
import ActionMenu from '../components/task/ActionMenu';
import StatusBadge from '../components/task/StatusBadge';

const initialTasks = [
    { id: 1, title: 'Draft initial project proposal', assignedTo: 'Alice Johnson', department: 'Marketing', deadline: '2025-08-15', status: 'Completed', description: 'Initial draft for the Q3 project. Focus on key metrics and target audience.' },
    { id: 2, title: 'Set up frontend development environment', assignedTo: 'You (John Doe)', department: 'Engineering', deadline: '2025-08-18', status: 'In Progress', description: 'Install Node, React, and Tailwind. Ensure all team members have access to the repository.' },
    { id: 3, title: 'Design database schema for tasks', assignedTo: 'Bob Williams', department: 'Engineering', deadline: '2025-08-20', status: 'Pending', description: 'Plan the tables for users, tasks, meetings, and attachments. Define relationships.' },
    { id: 4, title: 'Review Q2 performance report', assignedTo: 'Alice Johnson', department: 'Marketing', deadline: '2025-08-22', status: 'Pending', description: 'Analyze the performance metrics from the last quarter.' },
];

const TasksPage = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [viewingTask, setViewingTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'deadline', direction: 'ascending' });
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortIndicator, setSortIndicator] = useState('');

    const handleAddTask = (newTaskData) => { setTasks([{ id: Date.now(), ...newTaskData }, ...tasks]); };
    const handleUpdateTask = (updatedTask) => { setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task)); };
    const handleDeleteTask = (taskId) => { if (window.confirm('Are you sure you want to delete this task?')) { setTasks(tasks.filter(task => task.id !== taskId)); } };

    const handleOpenCreateModal = () => { setEditingTask(null); setIsEditModalVisible(true); };
    const handleOpenEditModal = (task) => { setEditingTask(task); setIsEditModalVisible(true); };
    const handleOpenDetailsModal = (task) => { setViewingTask(task); setIsDetailsModalVisible(true); };

    const handleCloseAllModals = () => { setIsEditModalVisible(false); setIsDetailsModalVisible(false); setEditingTask(null); setViewingTask(null); };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') { direction = 'descending'; }
        setSortConfig({ key, direction });
        const directionText = direction.charAt(0).toUpperCase() + direction.slice(1);
        setSortIndicator(`Sorted ${directionText}`);
        setTimeout(() => setSortIndicator(''), 2000);
    };

    const filteredAndSortedTasks = useMemo(() => {
        let processedTasks = [...tasks].filter(task => (statusFilter === 'All' || task.status === statusFilter) &&
            (searchQuery === '' || Object.values(task).some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase())))
        );
        if (sortConfig.key !== null) {
            processedTasks.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
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
                    {sortIndicator && <div className="absolute top-6 right-6 bg-slate-800 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">{sortIndicator}</div>}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <h2 className="text-2xl font-bold text-slate-800">Tasks List</h2>
                        <div className="flex items-center gap-2"><input type="text" placeholder="Search..." className="w-48 border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            <button onClick={handleOpenCreateModal} className="flex items-center bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600"><LuPlus className="mr-2" /> New Task</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b-2 border-slate-200">
                                <tr>
                                    {['Status', 'Task Title', 'Assigned To', 'Department', 'Deadline'].map(header => (
                                        <th key={header} className="p-1 text-sm font-semibold text-slate-500">
                                            {/* FIXED: Replaced hover:bg-slate-100 with hover:text-black */}
                                            <button onClick={() => requestSort(header.toLowerCase().replace(/ /g, ''))} className="flex items-center gap-1 p-2 rounded-md hover:text-black w-full text-left">
                                                {header} <LuArrowUpDown size={14} />
                                            </button>
                                        </th>
                                    ))}
                                    <th className="p-3 text-sm font-semibold text-slate-500 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedTasks.map((task) => (
                                    <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="p-3"><StatusBadge status={task.status} /></td>
                                        <td className="p-3 font-medium text-slate-800">{task.title}</td>
                                        <td className="p-3 text-slate-600">{task.assignedTo}</td>
                                        <td className="p-3 text-slate-600">{task.department}</td>
                                        <td className="p-3 text-slate-600">{task.deadline}</td>
                                        <td className="p-3 flex justify-center">
                                            <ActionMenu onViewDetails={() => handleOpenDetailsModal(task)} onEdit={() => handleOpenEditModal(task)} onDelete={() => handleDeleteTask(task.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <CreateTaskModal isVisible={isEditModalVisible} onClose={handleCloseAllModals} onAddTask={handleAddTask} taskToEdit={editingTask} onUpdateTask={handleUpdateTask} />
            <TaskDetailsModal isVisible={isDetailsModalVisible} onClose={handleCloseAllModals} task={viewingTask} />
        </>
    );
};

export default TasksPage;