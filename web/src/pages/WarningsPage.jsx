import { motion } from 'framer-motion'
import useStore from '../state/store'

const WarningsPage = () => {
    const { hudSettings, setHudSettings } = useStore();

    const enableWarnings = hudSettings.warnings.enableWarnings ?? true;
    const warningThreshold = hudSettings.warnings.warningThreshold ?? 10;
    const warningColor = hudSettings.warnings.warningColor ?? '#ef4444';

    const UpdateSettingings = (key, value) => {
        setHudSettings({
            ...hudSettings,
            warnings: {
                ...hudSettings.warnings,
                [key]: value
            }
        });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-white/40 text-xs font-medium uppercase tracking-wider">Warning Indicators</h3>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Enable Warning Icons</p>
                    <p className="text-white/40 text-xs mt-0.5">Show bouncing alert when status is low</p>
                </div>
                <button
                    onClick={() => UpdateSettingings('enableWarnings', !enableWarnings)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        enableWarnings ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: enableWarnings ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {/* Warning Threshold Slider */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between mb-3">
                    <span className="text-white/90 text-sm">Warning Threshold</span>
                    <span className="text-indigo-400 text-sm font-medium">{warningThreshold}%</span>
                </div>
                <input
                    type="range"
                    min={5}
                    max={50}
                    value={warningThreshold}
                    // @ts-ignore
                    onChange={(e) => UpdateSettingings('warningThreshold', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                        [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-indigo-400 [&::-webkit-slider-thumb]:shadow-md
                        [&::-webkit-slider-thumb]:cursor-pointer"
                />
            </div>

            {/* Warning Color */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/90 text-sm mb-3">Warning Color</p>
                <div className="flex gap-2">
                    {['#ef4444', '#f59e0b', '#eab308', '#ec4899', '#8b5cf6'].map((color) => (
                        <motion.button 
                            key={color} 
                            onClick={() => UpdateSettingings('warningColor', color)}
                            className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                                warningColor === color ? 'border-white' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WarningsPage