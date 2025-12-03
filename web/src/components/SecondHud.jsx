import useStore from '../state/store';
import StatusBar from './StatusBar.jsx';

const SecondHud = () => {
    const { hudSettings, defaultStatuses, statusList, statusValues } = useStore();
    const getStatusConfig = (id) => ({
        ...defaultStatuses[id] || {},
        ...(hudSettings.statuses[id] || {})
    });

    return (
        <div className="relative">
            <div className="flex gap-4">
                {statusList.map((status) => {
                    const config = getStatusConfig(status.id);
                    return (
                        <StatusBar
                            key={status.id}
                            icon={status.icon}
                            value={statusValues[status.id]}
                            color={config.color}
                            enabled={config.enabled}
                            hideUnder={config.hideUnder}
                            warningThreshold={hudSettings.warningThreshold}
                            warningColor={hudSettings.warningColor}
                            enableWarnings={hudSettings.enableWarnings}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default SecondHud