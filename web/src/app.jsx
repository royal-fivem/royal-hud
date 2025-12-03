import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import { AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react'
import { Settings01Icon } from '@hugeicons/core-free-icons'

import WindowListener from './utils/windowlistener';
import useStore from './state/store';
import isEnvBrowser from './utils/isEnvBrowser';

import MainHud from './components/MainHud';
import SecondHud from './components/SecondHud';
import Settings from './components/Settings';
import Compass from './components/Compass';

import './style.css';

export function App() {
	const { SettingsVisible, setState } = useStore()

    useEffect(() => {
            if (isEnvBrowser()) {
                document.body.style.backgroundColor = "rgba(43, 43, 43, 1)";
            }
    }, []);

    const openSettings = () => {
        setState({
            type: 'showUI',
            SettingsVisible: true,
            data: {}
        });
    }

    return (
        <WindowListener>
            <div 
                className="z-20 bottom-5 left-5 absolute flex gap-8 items-center"
                style={{
                    transform: 'scaleX(1) scaleY(1) scaleZ(1) rotateX(0deg) rotateY(7deg) rotateZ(-1deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg)',
                }}>
                    <MainHud />
                    <SecondHud />
            </div>

            <div className="z-10 mt-3">
                <Compass />
            </div>

            {isEnvBrowser() && (
                <button
                    onClick={() => openSettings()}
                    className="absolute bottom-5 right-5 z-20 p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-200 hover:scale-105"
                >
                    <HugeiconsIcon icon={Settings01Icon} size={24} className="text-white/60 hover:text-white" />
                </button>
            )}

            <AnimatePresence>
                {SettingsVisible && (
                    <Settings />
                )}
            </AnimatePresence>
        </WindowListener>
    )
}


render(<App />, document.getElementById('app'));