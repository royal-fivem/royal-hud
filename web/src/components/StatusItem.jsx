import { HugeiconsIcon } from '@hugeicons/react'
import { motion } from 'framer-motion';
import { useState } from 'preact/hooks';

const StatusItem = ({ icon, label, config, onUpdate }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    
    const colors = ['#f59e0b', '#3b82f6', '#80244B', '#B4DADE', '#EB2877', '#22c55e', '#ef4444', '#8b5cf6', '#14b8a6', '#ffffff'];
    
    return (
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3">
            {/* Status Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <HugeiconsIcon
                        icon={icon}
                        size={20}
                        style={{ color: config.color }}
                    />
                    <span className="text-white/90 text-sm font-medium">{label}</span>
                </div>
                <button
                    onClick={() => onUpdate({ ...config, enabled: !config.enabled })}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                        config.enabled ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: config.enabled ? 20 : 2 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {config.enabled && (
                <motion.div 
                    className="space-y-3 pt-2 border-t border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-white/60 text-xs">Color</span>
                            <button
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                className="w-6 h-6 rounded-full border border-white/20"
                                style={{ backgroundColor: config.color }}
                            />
                        </div>
                        {showColorPicker && (
                            <motion.div 
                                className="flex gap-1.5 flex-wrap"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {colors.map((color) => (
                                    <motion.button
                                        key={color}
                                        onClick={() => {
                                            onUpdate({ ...config, color });
                                            setShowColorPicker(false);
                                        }}
                                        className={`w-6 h-6 rounded-full border ${
                                            config.color === color ? 'border-white' : 'border-white/20'
                                        }`}
                                        style={{ backgroundColor: color }}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-white/60 text-xs">Hide under</span>
                            <span className="text-indigo-400 text-xs font-medium">{config.hideUnder}%</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={config.hideUnder}
                            // @ts-ignore
                            onChange={(e) => onUpdate({ ...config, hideUnder: parseInt(e.target.value) })}
                            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                                [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                                [&::-webkit-slider-thumb]:bg-indigo-400 [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                        <p className="text-white/30 text-xs mt-1">Set to 0 to always show</p>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default StatusItem