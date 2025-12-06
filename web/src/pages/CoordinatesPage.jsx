import { motion } from 'framer-motion'
import useStore from '../state/store'

const CoordinatesPage = () => {
    const { hudSettings, setHudSettings } = useStore();

    const showCompass = hudSettings?.compass?.showCompass ?? true;
    const showAngles = hudSettings?.compass?.showAngles ?? true;
    const showStreetName = hudSettings?.compass?.showStreetName ?? true;
    const showAreaName = hudSettings?.compass?.showAreaName ?? true;    

    const UpdateSettingings = (key, value) => {
        setHudSettings({
            ...hudSettings,
            compass: {
                ...hudSettings.compass,
                [key]: value
            }
        });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-white/40 text-xs font-medium uppercase tracking-wider">Compass Settings</h3>
            
            {/* Show Compass */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Compass</p>
                    <p className="text-white/40 text-xs mt-0.5">Display compass at top of screen</p>
                </div>
                <button
                    onClick={() => UpdateSettingings('showCompass', !showCompass)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        showCompass ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: showCompass ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {/* Show Angles/Degrees */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Angles</p>
                    <p className="text-white/40 text-xs mt-0.5">Display degree numbers on compass</p>
                </div>
                <button
                    onClick={() => UpdateSettingings('showAngles', !showAngles)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        showAngles ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: showAngles ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {/* Show Street Name */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Street Name</p>
                    <p className="text-white/40 text-xs mt-0.5">Display current street below compass</p>
                </div>
                <button
                    onClick={() => UpdateSettingings('showStreetName', !showStreetName)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        showStreetName ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: showStreetName ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {/* Show Area Name */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Area Name</p>
                    <p className="text-white/40 text-xs mt-0.5">Display area/district name below street</p>
                </div>
                <button
                    onClick={() => UpdateSettingings('showAreaName', !showAreaName)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        showAreaName ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: showAreaName ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>
        </div>
    )
}

export default CoordinatesPage