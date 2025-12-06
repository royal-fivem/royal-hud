// @ts-nocheck
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react'
import { FuelStationIcon, BeltIcon, Car01Icon } from '@hugeicons/core-free-icons'
import useStore from '../state/store';
import StatusItem from '../components/StatusItem';

const VehiclePage = () => {
    const { hudSettings, setHudSettings, vehicleStatuses } = useStore();
    const statuses = hudSettings.vehicleStatuses || defaultVehicleStatuses;

    const vehicleEnabled = hudSettings?.vehicle?.enabled ?? true;
    const showSpeed = hudSettings?.vehicle?.showSpeed ?? true;
    const showGear = hudSettings?.vehicle?.showGear ?? true;
    const speedUnit = hudSettings?.vehicle?.speedUnit ?? 'MPH';

    const UpdateSettingings = (key, value) => {
        setHudSettings({
            ...hudSettings,
            vehicle: {
                ...hudSettings.vehicle,
                [key]: value
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Vehicle HUD Toggle */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <HugeiconsIcon
                            icon={Car01Icon}
                            size={24}
                            className="text-purple-400"
                        />
                        <div>
                            <h3 className="text-white font-medium">Vehicle HUD</h3>
                            <p className="text-white/50 text-xs">Show vehicle information when in a vehicle</p>
                        </div>
                    </div>
                    <button
                        onClick={() => UpdateSettingings('enabled', !vehicleEnabled)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                            vehicleEnabled ? 'bg-purple-500' : 'bg-white/20'
                        }`}
                    >
                        <motion.div 
                            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                            animate={{ x: vehicleEnabled ? 26 : 4 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        />
                    </button>
                </div>
            </div>

            {vehicleEnabled && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Display Options */}
                    <div className="space-y-3">
                        <h4 className="text-white/70 text-sm font-medium">Display Options</h4>
                        
                        {/* Show Speed */}
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <span className="text-white/90 text-sm">Show Speed</span>
                            <button
                                onClick={() => UpdateSettingings('showSpeed', !showSpeed)}
                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                                    showSpeed ? 'bg-indigo-500' : 'bg-white/20'
                                }`}
                            >
                                <motion.div 
                                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md"
                                    animate={{ x: showSpeed ? 20 : 2 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                />
                            </button>
                        </div>

                        {/* Show Gear */}
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                            <span className="text-white/90 text-sm">Show Gear Indicator</span>
                            <button
                                onClick={() => UpdateSettingings('showGear', !showGear)}
                                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                                    showGear ? 'bg-indigo-500' : 'bg-white/20'
                                }`}
                            >
                                <motion.div 
                                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md"
                                    animate={{ x: showGear ? 20 : 2 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                />
                            </button>
                        </div>

                        {/* Speed Unit */}
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white/90 text-sm">Speed Unit</span>
                            </div>
                            <div className="flex gap-2">
                                {['MPH', 'KMH'].map((unit) => (
                                    <button
                                        key={unit}
                                        onClick={() => UpdateSettingings('speedUnit', unit)}
                                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                            speedUnit === unit
                                                ? 'bg-indigo-500 text-white'
                                                : 'bg-white/10 text-white/60 hover:bg-white/20'
                                        }`}
                                    >
                                        {unit}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Status Bars */}
                    <div className="space-y-3">
                        <h4 className="text-white/70 text-sm font-medium">Status Indicators</h4>
                        {vehicleStatuses.map((status) => (
                            <StatusItem
                                key={status.id}
                                icon={status.icon}
                                label={status.label}
                                config={hudSettings.vehicleStatuses?.[status.id]}
                                onUpdate={(config) => 
                                    setHudSettings({
                                        ...hudSettings,
                                        vehicleStatuses: {
                                            ...hudSettings.vehicleStatuses,
                                            [status.id]: config
                                        }
                                    })
                                }
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default VehiclePage;