// @ts-nocheck
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { Settings01Icon, Cancel01Icon, Alert02Icon, DashboardSquare02Icon, Location01Icon } from '@hugeicons/core-free-icons'
import useStore from '../state/store'
import CoordinatesPage from '../pages/CoordinatesPage'
import WarningsPage from '../pages/WarningsPage'
import StatusesPage from '../pages/StatusesPage'

const Settings = () => {
    const { hudSettings, setHudSettings, setState } = useStore();
    const [activePage, setActivePage] = useState('warnings');
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const pages = [
        { id: 'warnings', icon: Alert02Icon, label: 'Warnings', color: '#ef4444' },
        { id: 'statuses', icon: DashboardSquare02Icon, label: 'Statuses', color: '#3b82f6' },
        { id: 'coordinates', icon: Location01Icon, label: 'Coordinates', color: '#22c55e' },
    ];

    const handlePageClick = (pageId) => {
        setActivePage(pageId);
        setSidebarExpanded(true);
    };

    return (
        <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="absolute inset-0 bg-black/75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setState({ type: 'hideUI' })}
            />

            <motion.div 
                className="relative flex h-[50rem] bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <motion.div 
                    className="flex flex-col border-r border-white/10 bg-white/5 py-3"
                    animate={{ width: sidebarExpanded ? 160 : 56 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    {pages.map((page) => (
                        <button
                            key={page.id}
                            onClick={() => handlePageClick(page.id)}
                            className={`relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                                activePage === page.id ? 'bg-white/10' : 'hover:bg-white/5'
                            }`}
                        >
                            <motion.div 
                                className="absolute left-0 top-1/2 w-1 rounded-r-full"
                                style={{ backgroundColor: page.color }}
                                initial={{ height: 0, y: '-50%' }}
                                animate={{ 
                                    height: activePage === page.id ? 20 : 0,
                                    y: '-50%'
                                }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            />
                            
                            <HugeiconsIcon
                                icon={page.icon}
                                size={20}
                                style={{ color: activePage === page.id ? page.color : 'rgba(255,255,255,0.5)' }}
                                className="flex-shrink-0"
                            />
                            
                            <motion.span 
                                className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                style={{ color: activePage === page.id ? '#fff' : 'rgba(255,255,255,0.5)' }}
                                animate={{ 
                                    opacity: sidebarExpanded ? 1 : 0,
                                    width: sidebarExpanded ? 'auto' : 0
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {page.label}
                            </motion.span>
                        </button>
                    ))}
                </motion.div>

                <div className="w-[45rem] flex flex-col">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
                        <div className="flex items-center gap-3">
                            <HugeiconsIcon icon={Settings01Icon} size={20} className="text-indigo-400" />
                            <span className="text-white font-medium">HUD Settings</span>
                        </div>
                        <button
                            onClick={() => setState({ type: 'hideUI' })}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <HugeiconsIcon icon={Cancel01Icon} size={18} className="text-white/60" />
                        </button>
                    </div>

                    <div className="p-5 overflow-y-auto flex-1">
                        {activePage === 'warnings' && (
                            <WarningsPage />
                        )}
                        {activePage === 'statuses' && (
                            <StatusesPage />
                        )}
                        {activePage === 'coordinates' && (
                            <CoordinatesPage />
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Settings