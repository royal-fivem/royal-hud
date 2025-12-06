import { HugeiconsIcon } from '@hugeicons/react'
import useStore from '../state/store';

const VehicleHud = () => {
    const { statusValues, hudSettings, vehicleStatuses } = useStore();
    
    const vehicleSettings = hudSettings?.vehicle || {};
    const vehicleEnabled = vehicleSettings.enabled ?? true;
    const showSpeed = vehicleSettings.showSpeed ?? true;
    const showBars = vehicleSettings.showBars ?? true;
    const speedUnit = vehicleSettings.speedUnit ?? 'MPH';

    if (!vehicleEnabled) return null;

    const speed = statusValues?.speed ?? 100;
    const rpm = statusValues?.rpm ?? 80;
    const nitro = statusValues?.nitro ?? 50;

    const displaySpeed = speedUnit === 'KMH'
        ? Math.round(speed * 3.6)
        : Math.round(speed * 2.23694);

    return (
        <div className="flex gap-6 select-none items-center">
            <div className="flex flex-col items-center">
                {showSpeed && (
                    <div className="flex items-baseline gap-3 relative">
                        <span 
                            className="text-white font-black tracking-tighter"
                            style={{ fontSize: '4rem' }}
                        >
                            {displaySpeed}
                        </span>
                    </div>
                )}

                {showBars && (
                    <div className="flex flex-col items-center relative w-60 gap-2">
                        <span className="absolute right-0 top-[-1rem] text-white/60 text-sm font-bold tracking-wider -mt-2">
                            {speedUnit}
                        </span>

                        <div className="relative w-full h-2 bg-white/20 rounded-sm overflow-hidden">
                            <div 
                                className="absolute top-0 right-0 h-full bg-white transition-all duration-150 ease-out"
                                style={{ width: `${rpm}%` }}
                            />
                        </div>

                        <div className="relative w-[50%] h-1 bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className="absolute top-0 right-0 h-full rounded-full transition-all duration-150 ease-out"
                                style={{ 
                                    width: `${nitro}%`,
                                    backgroundColor: '#a855f7'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="h-12 w-0.5 rounded-full bg-white/20"></div>

            <div className="flex flex-col gap-4">
                {vehicleStatuses.map((status) => {
                    const config = hudSettings?.vehicleStatuses?.[status.id] || {};
                    const value = statusValues?.[status.id] || 0;
                    
                    if (!config.enabled) return null;
                    if (config.hideUnder > 0 && status.value > config.hideUnder) return null;

                    return (
                        <div key={status.id} className="flex items-center gap-2">
                            <div className="w-1 h-6 relative rounded-full bg-white/20 overflow-hidden">
                                <div 
                                    className="w-full absolute bottom-0 rounded-full transition-all duration-300 ease-out"
                                    style={{
                                        height: `${value}%`,
                                        backgroundColor: config.color,
                                    }}
                                />
                            </div>
                            <HugeiconsIcon
                                icon={status.icon}
                                style={{ color: config.color }}
                                size={20}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default VehicleHud
