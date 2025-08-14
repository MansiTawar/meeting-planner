// Filename: src/components/task/ActionMenu.js
// --- This is the complete, smarter version that opens upwards when needed ---

import React, { useState, useEffect, useRef } from 'react';
import { LuEllipsisVertical, LuEye, LuPencil, LuTrash2 } from 'react-icons/lu';

const ActionMenu = ({ onViewDetails, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    // NEW: State to control if the menu opens upwards
    const [openUpwards, setOpenUpwards] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null); // Ref for the button itself

    // This function now checks the position before opening
    const handleMenuToggle = () => {
        if (!isOpen) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Check if the space below is less than the menu height (approx 130px)
            if (window.innerHeight - rect.bottom < 130) {
                setOpenUpwards(true);
            } else {
                setOpenUpwards(false);
            }
        }
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <button ref={buttonRef} onClick={handleMenuToggle} className="p-2 rounded-full hover:bg-slate-200">
                <LuEllipsisVertical size={20} />
            </button>
            {isOpen && (
                // NEW: Dynamic classes to change position
                <div className={`absolute right-0 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-10 ${openUpwards ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
                    <ul>
                        <li><button onClick={() => { onViewDetails(); setIsOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-slate-700 hover:bg-slate-100"><LuEye className="mr-3" size={16} /> View Details</button></li>
                        <li><button onClick={() => { onEdit(); setIsOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-slate-700 hover:bg-slate-100"><LuPencil className="mr-3" size={16} /> Edit</button></li>
                        <li><button onClick={() => { onDelete(); setIsOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-red-50"><LuTrash2 className="mr-3" size={16} /> Delete</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;