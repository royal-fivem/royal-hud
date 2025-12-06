import SendNuiCallback from '../utils/sendnuicallback.js';
import isEnvBrowser from '../utils/isEnvBrowser.js';
import { create } from 'zustand'
import deepMerge from '../utils/deepMerge.js';
import { 
    Pizza01Icon,
    MilkBottleIcon,
    BrainIcon,
    ZapIcon,
    SourceCodeIcon,
    FuelStationIcon,
    Car01Icon,
    BeltIcon
} from '@hugeicons/core-free-icons'

// Casper wants to use the hugeicons icon library so idk how to get the icons from the lua config.
const STATUS_DEFINITIONS = [
    { id: 'hunger',  icon: Pizza01Icon,  label: 'Hunger',  showInSettings: true,  color: '#f59e0b', hideUnder: 0, enabled: true },
    { id: 'thirst',  icon: MilkBottleIcon, label: 'Thirst', showInSettings: true,  color: '#3b82f6', hideUnder: 0, enabled: true },
    { id: 'stress',  icon: BrainIcon,    label: 'Stress',  showInSettings: true,  color: '#80244B', hideUnder: 0, enabled: false },
    { id: 'energy',  icon: ZapIcon,      label: 'Energy',  showInSettings: true,  color: '#B4DADE', hideUnder: 0, enabled: true },
    { id: 'dev',     icon: SourceCodeIcon, label: 'Dev',   showInSettings: false, color: '#EB2877', hideUnder: 0, enabled: false },
];

const VEHICLE_STATUS_DEFINITIONS = [
    { id: 'fuel',     icon: FuelStationIcon, label: 'Fuel',     color: '#3b82f6', enabled: true, hideUnder: 0 },
    { id: 'engine',   icon: Car01Icon,       label: 'Engine',   color: '#3b82f6', enabled: true, hideUnder: 0 },
    { id: 'seatbelt', icon: BeltIcon,        label: 'Seatbelt', color: '#3b82f6', enabled: true, hideUnder: 0 },
];

const STATUS_LIST = STATUS_DEFINITIONS.map(({ id, icon, label, showInSettings }) => ({
    id, icon, label, showInSettings
}));

const DEFAULT_STATUS_SETTINGS = (
    STATUS_DEFINITIONS.map(s => [
        s.id,
        { enabled: s.enabled, color: s.color, hideUnder: s.hideUnder }
    ])
);

const VEHICLE_STATUS_LIST = VEHICLE_STATUS_DEFINITIONS.map(({ id, icon, label }) => ({
    id, icon, label
}));

const DEFAULT_VEHICLE_SETTINGS = (
    VEHICLE_STATUS_DEFINITIONS.map(v => [
        v.id,
        { enabled: v.enabled, color: v.color, hideUnder: v.hideUnder }
    ])
);

const DIRECTIONS = [
    { label: 'N',  degree: 0 },
    { label: 'NE', degree: 45 },
    { label: 'E',  degree: 90 },
    { label: 'SE', degree: 135 },
    { label: 'S',  degree: 180 },
    { label: 'SW', degree: 225 },
    { label: 'W',  degree: 270 },
    { label: 'NW', degree: 315 },
];

const DEFAULT_HUD_SETTINGS = {
    warnings: {
        enableWarnings: true,
        warningThreshold: 10,
        warningColor: '#ef4444',
    },

    compass: {
        showCompass: true,
        showAngles: true,
        showStreetName: true,
        showAreaName: true,
    },

    vehicle: {
        enabled: true,
        showSpeed: true,
        showGear: true,
        speedUnit: 'MPH',
    },

    vehicleStatuses: DEFAULT_VEHICLE_SETTINGS,
    statuses: DEFAULT_STATUS_SETTINGS,
};

const DEFAULT_STATUS_VALUES = {
    health: 100,
    armor: 0,
    hunger: 50,
    thirst: 8,
    stress: 75,
    energy: 5,
    dev: 100,
    compass: 100,
    
    inVehicle: false,
    speed: 1,
    rpm: 0,
    nitro: 0,
    seatbelt: 0,
    fuel: 100,
    engine: 100,
};

const useStore = create((set, get) => ({
    playerLoaded: false,
    SettingsVisible: false,

    directions: DIRECTIONS,
    statusList: STATUS_LIST,
    vehicleStatuses: VEHICLE_STATUS_LIST,

    defaultStatuses: DEFAULT_STATUS_SETTINGS,
    defaultVehicleStatuses: DEFAULT_VEHICLE_SETTINGS,

    hudSettings: DEFAULT_HUD_SETTINGS,
    statusValues: DEFAULT_STATUS_VALUES,

    setState: (payload) => {
        if (!payload || typeof payload.type !== 'string') return
        
        if (payload.type === 'showUI') {
            set({ SettingsVisible: true })
            return
        }

        if (payload.type === 'hideUI') {
            if (isEnvBrowser()) {
                set({ SettingsVisible: false })
                return
            }

            SendNuiCallback('close', {}, () => {
                set({ SettingsVisible: false })
            })
            return
        }

        if (payload.type === 'playerLoaded') {
            set({ playerLoaded: true })
            return
        }

        if (payload.type === 'fetchDefaultSettings') {
            const current = get().hudSettings || {}
            SendNuiCallback('saveSettings', current, () => {})
            return
        }

        if (payload.type === 'updateHudSettings') {
            const incoming = payload.data.hudSettings || {};
            set({ hudSettings: incoming });
            return;
        }

        if (payload.type === 'updateStatusValues') {
            const incoming = payload.data.statusValues || {};
            set({ statusValues: incoming });
            return;
        }
    },

    setHudSettings: (updater) => {
        set((state) => {
            const next = typeof updater === 'function'
                ? updater(state.hudSettings)
                : deepMerge(state.hudSettings, updater);

            if (!isEnvBrowser()) {
                SendNuiCallback('saveSettings', next, () => {})
            }

            return { hudSettings: next };
        });
    }
}))

export default useStore;
