import { useState, useEffect, useRef } from 'preact/hooks'
import isEnvBrowser from '../utils/isEnvBrowser';
import useStore from '../state/store';

const MainHud = () => {
    const { statusValues } = useStore();
    const initialShield = (statusValues && typeof statusValues.armor === 'number') ? statusValues.armor : 70;
    const initialHealth = (statusValues && typeof statusValues.health === 'number') ? statusValues.health : 100;

    const [currentShield, setCurrentShield] = useState(initialShield);
    const [targetShield, setTargetShield] = useState(initialShield);
    const [isAddingShield, setIsAddingShield] = useState(false);
    const addingShieldTimeoutRef = useRef(null);

    const [currentHealth, setCurrentHealth] = useState(initialHealth);
    const [targetHealth, setTargetHealth] = useState(initialHealth);
    const [isAddingHealth, setIsAddingHealth] = useState(false);
    const addingHealthTimeoutRef = useRef(null);

    const [isDamaged, setIsDamaged] = useState(false);
    const [damageShieldWidth, setDamageShieldWidth] = useState(null);
    const [damageHealthWidth, setDamageHealthWidth] = useState(null);

    const prevStatusRef = useRef({ armor: initialShield, health: initialHealth });
    const isFirstSyncRef = useRef(true);

    const sectors = 5;
    const stepSize = 5;
    const stepDelay = 450;
    const damageStepDelay = 30;
    const damageFallSpeed = 0.8;

    // Shield fill animation
    useEffect(() => {
        if (currentShield < targetShield) {
            const timer = setTimeout(() => {
                setCurrentShield(prev => Math.min(prev + stepSize, targetShield));
            }, stepDelay);
            return () => clearTimeout(timer);
        }
    }, [currentShield, targetShield]);

    // Health fill animation
    useEffect(() => {
        if (currentHealth < targetHealth) {
            const timer = setTimeout(() => {
                setCurrentHealth(prev => Math.min(prev + stepSize, targetHealth));
            }, stepDelay);
            return () => clearTimeout(timer);
        }
    }, [currentHealth, targetHealth]);

    // Damage shield fallback animation
    useEffect(() => {
        if (damageShieldWidth !== null && damageShieldWidth > currentShield) {
            const timer = setTimeout(() => {
                setDamageShieldWidth(prev => Math.max(prev - damageFallSpeed, currentShield));
            }, damageStepDelay);
            return () => clearTimeout(timer);
        } else if (damageShieldWidth !== null && damageShieldWidth <= currentShield) {
            setDamageShieldWidth(null);
        }
    }, [damageShieldWidth, currentShield]);

    // Damage health fallback animation
    useEffect(() => {
        if (damageHealthWidth !== null && damageHealthWidth > currentHealth) {
            const timer = setTimeout(() => {
                setDamageHealthWidth(prev => Math.max(prev - damageFallSpeed, currentHealth));
            }, damageStepDelay);
            return () => clearTimeout(timer);
        } else if (damageHealthWidth !== null && damageHealthWidth <= currentHealth) {
            setDamageHealthWidth(null);
        }
    }, [damageHealthWidth, currentHealth]);

    const addShield = (amount) => {
        setTargetShield(prev => Math.min(prev + amount, 100));
        setIsAddingShield(true);

        if (addingShieldTimeoutRef.current) {
            clearTimeout(addingShieldTimeoutRef.current);
        }

        addingShieldTimeoutRef.current = setTimeout(() => {
            setIsAddingShield(false);
        }, 500);
    };

    const addHealth = (amount) => {
        setTargetHealth(prev => Math.min(prev + amount, 100));
        setIsAddingHealth(true);

        if (addingHealthTimeoutRef.current) {
            clearTimeout(addingHealthTimeoutRef.current);
        }

        addingHealthTimeoutRef.current = setTimeout(() => {
            setIsAddingHealth(false);
        }, 500);
    };

    const takeDamage = (amount) => {
        let remainingDamage = amount;

        const prevShield = currentShield;
        const prevHealth = currentHealth;

        if (currentShield > 0) {
            const shieldDamage = Math.min(remainingDamage, currentShield);
            remainingDamage -= shieldDamage;
            const newShield = currentShield - shieldDamage;
            setDamageShieldWidth(prevShield);
            setCurrentShield(newShield);
            setTargetShield(newShield);
        }

        if (remainingDamage > 0) {
            const newHealth = Math.max(currentHealth - remainingDamage, 0);
            setDamageHealthWidth(prevHealth);
            setCurrentHealth(newHealth);
            setTargetHealth(newHealth);
        }

        setIsDamaged(true);
        setTimeout(() => setIsDamaged(false), 300);
    };

    useEffect(() => {
        if (!statusValues) return;

        const newShield = Math.max(0, Math.min(100, typeof statusValues.armor === 'number' ? statusValues.armor : targetShield));
        const newHealth = Math.max(0, Math.min(100, typeof statusValues.health === 'number' ? statusValues.health : targetHealth));

        if (isFirstSyncRef.current) {
            isFirstSyncRef.current = false;
            prevStatusRef.current = { armor: newShield, health: newHealth };

            setCurrentShield(newShield);
            setTargetShield(newShield);
            setDamageShieldWidth(null);

            setCurrentHealth(newHealth);
            setTargetHealth(newHealth);
            setDamageHealthWidth(null);

            return;
        }

        const prev = prevStatusRef.current;

        if (newShield !== prev.armor) {
            const diff = newShield - prev.armor;
            if (diff > 0) {
                addShield(diff);
                setTargetShield(Math.min(Math.max(newShield, targetShield), 100));
            } else {
                setDamageShieldWidth(currentShield);
                setCurrentShield(newShield);
                setTargetShield(newShield);
                setIsDamaged(true);
                setTimeout(() => setIsDamaged(false), 300);
            }
        }

        if (newHealth !== prev.health) {
            const diffH = newHealth - prev.health;
            if (diffH > 0) {
                addHealth(diffH);
                setTargetHealth(Math.min(Math.max(newHealth, targetHealth), 100));
            } else {
                setDamageHealthWidth(currentHealth);
                setCurrentHealth(newHealth);
                setTargetHealth(newHealth);
                setIsDamaged(true);
                setTimeout(() => setIsDamaged(false), 300);
            }
        }

        prevStatusRef.current = { armor: newShield, health: newHealth };

    }, [statusValues]);

    useEffect(() => {
        return () => {
            if (addingShieldTimeoutRef.current) clearTimeout(addingShieldTimeoutRef.current);
            if (addingHealthTimeoutRef.current) clearTimeout(addingHealthTimeoutRef.current);
        };
    }, []);

    return (
        <>
            <div className="gap-4 flex items-center">
                <div className={`flex flex-col text-white ${isDamaged ? 'shake' : ''}`}>
                    <div className={`border w-80 p-1 transition-colors duration-100 ${isDamaged ? 'border-red-500' : 'border-white/50'}`}>
                        <div className="relative h-2.5 stripe-container">
                            <div className="absolute inset-0 flex gap-[3px]">
                                {[...Array(sectors)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-full bg-white/20 flex-1"
                                    />
                                ))}
                            </div>

                            {damageShieldWidth !== null && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-red-500"
                                    style={{ width: `${damageShieldWidth}%` }}
                                />
                            )}

                            <div
                                className={`absolute top-0 left-0 h-full ${isAddingShield ? 'animated-stripes-orange' : 'animated-stripes-white'}`}
                                style={{ width: `${targetShield}%` }}
                            />

                            <div
                                className="absolute top-0 left-0 h-full transition-colors duration-100"
                                style={{
                                    width: `${currentShield}%`,
                                    backgroundColor: isDamaged ? '#ef4444' : '#5980b3'
                                }}
                            />

                            <div className="absolute inset-0 flex pointer-events-none">
                                {[...Array(sectors - 1)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-full w-[3px] bg-gray-900"
                                        style={{
                                            position: 'absolute',
                                            left: `${((index + 1) * 100) / sectors}%`,
                                            transform: 'translateX(-50%)'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`border-b border-l border-r w-80 p-1 transition-colors duration-100 ${isDamaged ? 'border-red-500' : 'border-white/50'}`}>
                        <div className="relative h-2.5 bg-white/20 overflow-hidden">
                            {damageHealthWidth !== null && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-red-500"
                                    style={{ width: `${damageHealthWidth}%` }}
                                />
                            )}

                            <div
                                className={`absolute top-0 left-0 h-full ${isAddingHealth ? 'animated-stripes-green' : 'animated-stripes-white-health'}`}
                                style={{ width: `${targetHealth}%` }}
                            />

                            <div
                                className="absolute top-0 left-0 h-full transition-colors duration-100"
                                style={{
                                    width: `${currentHealth}%`,
                                    backgroundColor: isDamaged ? '#ef4444' : '#fff'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Controls for web */}
            {isEnvBrowser() && (
                <div className="absolute top-[-500%] flex flex-wrap gap-2 mt-4 max-w-80">
                    <button
                        onClick={() => addShield(20)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs"
                    >
                        +20 Shield
                    </button>

                    <button
                        onClick={() => addShield(35)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs"
                    >
                        +35 Shield
                    </button>

                    <button
                        onClick={() => addHealth(20)}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs"
                    >
                        +20 Health
                    </button>

                    <button
                        onClick={() => addHealth(35)}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs"
                    >
                        +35 Health
                    </button>

                    <button
                        onClick={() => takeDamage(15)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs"
                    >
                        -15 Damage
                    </button>

                    <button
                        onClick={() => takeDamage(30)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs"
                    >
                        -30 Damage
                    </button>

                    <button
                        onClick={() => takeDamage(50)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs"
                    >
                        -50 Damage
                    </button>

                    <button
                        onClick={() => {
                            setCurrentShield(70);
                            setTargetShield(70);
                            setCurrentHealth(100);
                            setTargetHealth(100);
                            setDamageShieldWidth(null);
                            setDamageHealthWidth(null);
                            setIsDamaged(false);

                            prevStatusRef.current = { armor: 70, health: 100 };
                        }}
                        className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white rounded text-xs"
                    >
                        Reset
                    </button>
                </div>
            )}
        </>
    )
}

export default MainHud
