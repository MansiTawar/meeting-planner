import React from 'react';
import { LuVideo, LuBuilding } from 'react-icons/lu';

const MeetingModeBadge = ({ mode }) => {
    const isOnline = mode === 'Online';
    
    const modeStyles = {
        Online: 'bg-blue-100 text-blue-800',
        Offline: 'bg-purple-100 text-purple-800',
    };

    const Icon = isOnline ? LuVideo : LuBuilding;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${modeStyles[mode] || 'bg-gray-100 text-gray-800'}`}>
            <Icon size={14} />
            {mode}
        </span>
    );
};

export default MeetingModeBadge;