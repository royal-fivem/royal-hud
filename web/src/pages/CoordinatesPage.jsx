import { motion } from 'framer-motion'
import useStore from '../state/store'

const CoordinatesPage = () => {
    const { hudSettings, setHudSettings } = useStore();

    return (
        <div className="space-y-4">
            <h3 className="text-white/40 text-xs font-medium uppercase tracking-wider">Coordinates Display</h3>
            
            {/* Show Coordinates */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Coordinates</p>
                    <p className="text-white/40 text-xs mt-0.5">Display current position</p>
                </div>
                <button
                    onClick={() => setHudSettings(prev => ({ ...prev, showCoordinates: !prev.showCoordinates }))}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        hudSettings.showCoordinates ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: hudSettings.showCoordinates ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                    <p className="text-white/90 text-sm">Show Street Name</p>
                    <p className="text-white/40 text-xs mt-0.5">Display current street on compass</p>
                </div>
                <button
                    onClick={() => setHudSettings(prev => ({ ...prev, showStreetName: !prev.showStreetName }))}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        hudSettings.showStreetName !== false ? 'bg-indigo-500' : 'bg-white/20'
                    }`}
                >
                    <motion.div 
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ x: hudSettings.showStreetName !== false ? 24 : 4 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                </button>
            </div>

            {/* Coordinate Format */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/90 text-sm mb-3">Coordinate Format</p>
                <div className="flex gap-2">
                    {['decimal', 'degrees', 'vector'].map((format) => (
                        <button
                            key={format}
                            onClick={() => setHudSettings(prev => ({ ...prev, coordFormat: format }))}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm capitalize transition-colors ${
                                (hudSettings.coordFormat || 'decimal') === format 
                                    ? 'bg-indigo-500 text-white' 
                                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                            }`}
                        >
                            {format}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CoordinatesPage