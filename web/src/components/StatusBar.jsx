import { HugeiconsIcon } from '@hugeicons/react'
import { Alert02Icon } from '@hugeicons/core-free-icons'

const StatusBar = ({ icon, value, color, warningThreshold, warningColor, enableWarnings, hideUnder, enabled }) => {
    if (!enabled) return null;
    if (hideUnder > 0 && value > hideUnder) return null;
    
    const isWarning = enableWarnings && value <= warningThreshold;
    
    return (
        <div className="relative flex items-center gap-1.5">
            {isWarning && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 warning-bounce">
                    <HugeiconsIcon
                        icon={Alert02Icon}
                        style={{ color: warningColor }}
                        size={18}
                    />
                </div>
            )}
            
            <div className="w-1 h-6 relative rounded-full bg-white/25">
                <div 
                    className={`w-1 absolute bottom-0 rounded-full ${isWarning ? 'warning-pulse' : ''}`}
                    style={{
                        height: `${value}%`,
                        backgroundColor: isWarning ? warningColor : color,
                    }}
                />
            </div>
            <HugeiconsIcon
                icon={icon}
                style={{ color: isWarning ? warningColor : color }}
                size={24}
                className={isWarning ? 'warning-pulse' : ''}
            />
        </div>
    )
}

export default StatusBar