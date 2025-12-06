Config = {}

Config.Debug = false -- Enable or disable debug mode
Config.Framework = 'QBX' -- options: 'ESX', 'QBX'
Config.TickRate = 30 -- How often (in ms) the script should check for updates
Config.SaveName = 'royal-hud-settings' -- The name used to save HUD settings

-- Set this up according to your server requirements
function getFuel(vehicle)
    if GetResourceState('ox_fuel') == 'started' then
        return Entity(vehicle).state.fuel
    end

    if GetResourceState('LegacyFuel') == 'started' then
        return exports["LegacyFuel"]:GetFuel(vehicle)
    end

    return GetVehicleFuelLevel(vehicle)
end

-- Set this up according to your server requirements
function getNitroLevel(vehicle)
    return 0.0
end
