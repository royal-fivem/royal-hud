import SendNuiCallback from '../utils/sendnuicallback.js';
import isEnvBrowser from '../utils/isEnvBrowser.js';
import { create } from 'zustand'
import { 
    Pizza01Icon,
    MilkBottleIcon,
    BrainIcon,
    ZapIcon,
    SourceCodeIcon
} from '@hugeicons/core-free-icons'

const useStore = create((set, get) => ({
    SettingsVisible: false,

    directions: [
        { label: 'N', degree: 0 },
        { label: 'NE', degree: 45 },
        { label: 'E', degree: 90 },
        { label: 'SE', degree: 135 },
        { label: 'S', degree: 180 },
        { label: 'SW', degree: 225 },
        { label: 'W', degree: 270 },
        { label: 'NW', degree: 315 },
    ],

    statusList: [
        { id: 'hunger', icon: Pizza01Icon, label: 'Hunger' },
        { id: 'thirst', icon: MilkBottleIcon, label: 'Thirst' },
        { id: 'stress', icon: BrainIcon, label: 'Stress' },
        { id: 'energy', icon: ZapIcon, label: 'Energy' },
        { id: 'dev', icon: SourceCodeIcon, label: 'Dev' },
    ],

    defaultStatuses: {
        hunger: { enabled: true, color: '#f59e0b', hideUnder: 0 },
        thirst: { enabled: true, color: '#3b82f6', hideUnder: 0 },
        stress: { enabled: false, color: '#80244B', hideUnder: 0 },
        energy: { enabled: true, color: '#B4DADE', hideUnder: 0 },
        dev:    { enabled: false, color: '#EB2877', hideUnder: 0 },
    },

    hudSettings: {
        enableWarnings: true,
        warningThreshold: 10,
        warningColor: '#ef4444',
        showCoordinates: false,
        showStreetName: true,
        coordFormat: 'decimal',
        statuses: {
            hunger: { enabled: true, color: '#f59e0b', hideUnder: 0 },
            thirst: { enabled: true, color: '#3b82f6', hideUnder: 0 },
            stress: { enabled: true, color: '#80244B', hideUnder: 0 },
            energy: { enabled: true, color: '#B4DADE', hideUnder: 0 },
            dev:    { enabled: true, color: '#EB2877', hideUnder: 0 },
        }
    },

    statusValues: {
        health: 100,
        armor: 0,

        hunger: 50,
        thirst: 8,
        stress: 75,
        energy: 5,
        dev: 100,

        compass: 100,
    },

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
            const existing = state.hudSettings || {};
            const computed = typeof updater === 'function' ? updater(existing) : { ...existing, ...updater };
            const next = { ...existing, ...computed };
            
            console.log('Saving HUD settings:', next);

            if (!isEnvBrowser()) {
                SendNuiCallback('saveSettings', next, () => {})
            }

            return { hudSettings: next };
        });
    }
}))

export default useStore;
