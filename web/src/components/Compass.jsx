import useStore from '../state/store';

const Compass = () => {
    const { statusValues, directions, hudSettings } = useStore();
    
    const showCompass = hudSettings?.compass?.showCompass ?? true;
    const showAngles = hudSettings?.compass?.showAngles ?? true;
    const showStreetName = hudSettings?.compass?.showStreetName ?? true;
    const showAreaName = hudSettings?.compass?.showAreaName ?? true;

    if (!showCompass) return null;

    const heading = statusValues?.compass ?? 0;
    const streetName = statusValues?.streetName ?? "Unknown Road";
    const areaName = statusValues?.areaName ?? "Unknown Area";

    const ticks = [];
    for (let i = 0; i < 360; i += 3) {
        ticks.push(i);
    }

    const getPosition = (degree) => {
        let diff = degree - heading;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        return diff;
    };

    const visibleRange = 60;

    return (
        <div className="flex flex-col items-center select-none">
            <div className="relative w-[500px] h-12">
                <div className="absolute inset-x-0 top-0 h-5 flex items-center justify-center">
                    {directions.map((dir) => {
                        const pos = getPosition(dir.degree);
                        if (Math.abs(pos) > visibleRange) return null;

                        const xPercent = 50 + (pos / visibleRange) * 50;

                        return (
                            <span
                                key={dir.label}
                                className="absolute text-xs font-medium text-white/50"
                                style={{
                                    left: `${xPercent}%`,
                                    transform: 'translateX(-50%)'
                                }}
                            >
                                {dir.label}
                            </span>
                        );
                    })}

                    {showAngles && [...Array(24)].map((_, i) => {
                        const degree = i * 15;
                        const pos = getPosition(degree);
                        if (Math.abs(pos) > visibleRange) return null;
                        if (degree % 45 === 0) return null;

                        const xPercent = 50 + (pos / visibleRange) * 50;

                        return (
                            <span
                                key={`deg-${degree}`}
                                className="absolute text-xs text-white/30"
                                style={{
                                    left: `${xPercent}%`,
                                    transform: 'translateX(-50%)'
                                }}
                            >
                                {degree}
                            </span>
                        );
                    })}
                </div>

                <div className="absolute inset-x-0 top-6 h-3 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 z-10 pointer-events-none" />

                    {ticks.map((degree) => {
                        const pos = getPosition(degree);
                        if (Math.abs(pos) > visibleRange) return null;

                        const isMajor = degree % 15 === 0;
                        const isCardinal = degree % 45 === 0;
                        const xPercent = 50 + (pos / visibleRange) * 50;

                        return (
                            <div
                                key={`tick-${degree}`}
                                className="absolute"
                                style={{
                                    left: `${xPercent}%`,
                                    transform: 'translateX(-50%)'
                                }}
                            >
                                <div
                                    className={`bg-white/60 ${isCardinal ? 'h-3 w-[2px]' :
                                            isMajor ? 'h-2 w-[1px]' :
                                                'h-1.5 w-[1px] opacity-50'
                                        }`}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="absolute left-1/2 bottom-1 -translate-x-1/2 z-30 flex flex-col items-center">
                    <div
                        className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent border-b-white"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center mt-0">
                {showStreetName && (
                    <span className="text-white/80 text-sm font-medium tracking-wide">
                        {streetName}
                    </span>
                )}
                {showAreaName && (
                    <span className="text-white/40 text-xs">
                        {areaName}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Compass