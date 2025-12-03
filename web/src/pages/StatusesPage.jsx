import useStore from '../state/store'
import StatusItem from '../components/StatusItem'

const StatusesPage = () => {
    const { defaultStatuses, hudSettings, setHudSettings, statusList } = useStore();
    const statuses = hudSettings.statuses || defaultStatuses;

    const updateStatus = (id, config) => {
        setHudSettings(prev => ({
            ...prev,
            statuses: {
                ...prev.statuses,
                [id]: config
            }
        }));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-white/40 text-xs font-medium uppercase tracking-wider">Status Configuration</h3>
            
            {statusList.map((status) => (
                <StatusItem
                    key={status.id}
                    icon={status.icon}
                    label={status.label}
                    config={statuses[status.id] || defaultStatuses[status.id]}
                    onUpdate={(config) => updateStatus(status.id, config)}
                />
            ))}
        </div>
    )
}

export default StatusesPage