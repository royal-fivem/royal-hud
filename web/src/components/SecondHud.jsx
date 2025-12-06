import useStore from '../state/store';
import StatusBar from './StatusBar.jsx';

const SecondHud = () => {
    const { hudSettings, statusList, statusValues } = useStore();

    return (
        <div className="relative">
            <div className="flex gap-4">

                {statusList
                    .filter(status => 
                        status.showInSettings || statusValues[status.id] > 0
                    )
                    .map((status) => {
                        const config = hudSettings.statuses?.[status.id] || {};

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
    );
};

export default SecondHud;
