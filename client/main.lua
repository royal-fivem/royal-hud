local dev = false

RegisterNetEvent('royal-hud:toggleDevmode', function()
    dev = not dev
end)

Citizen.CreateThread(function ()
    while not bridge.isPlayerLoaded() do
        Wait(100)
    end
    local settings = json.decode(GetResourceKvpString(Config.SaveName))

    if settings == nil or settings == {} then
        dprint('No saved settings found, loading defaults.')
        SendNUIMessage({
            type = 'fetchDefaultSettings',
            data = {}
        })
    else
        dprint('Loaded saved settings.')
        SendNUIMessage({
            type = 'updateHudSettings',
            data = {
                hudSettings = settings
            }
        })
    end

    Wait(1000)
    loadMinimap()
end)

RegisterNuiCallback('saveSettings', function(data, cb)
    local settings = data
    SetResourceKvp(Config.SaveName, json.encode(settings))
    dprint('Saved HUD settings')
    cb({ success = true })
end)

RegisterCommand('hudsettings', function()
    TriggerScreenblurFadeIn(1000)
    SendNUIMessage({
        type = 'showUI',
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback("close", function(_, cb)
    TriggerScreenblurFadeOut(1000)
    SetNuiFocus(false, false)
    cb({ success = true })
end)

Citizen.CreateThread(function ()
    while true do
        if bridge.isPlayerLoaded() then
            local ped = PlayerPedId()
            local playerCoords = GetEntityCoords(ped)
            local camRot = GetGameplayCamRot(0)
            local streetName = GetStreetNameFromHashKey(GetStreetNameAtCoord(playerCoords.x, playerCoords.y, playerCoords.z))
            local zoneName = GetLabelText(GetNameOfZone(playerCoords.x, playerCoords.y, playerCoords.z))
            local hunger, thirst = bridge.getPlayerStatus()

            SendNUIMessage({
                type = 'updateStatusValues',
                data = {
                    statusValues = {
                        health = GetEntityHealth(ped) - 100,
                        armor = GetPedArmour(ped),

                        hunger = hunger,
                        thirst = thirst,
                        stress = 0,
                        energy = GetPlayerStamina(PlayerId()),
                        dev = dev == true and 100 or 0,

                        compass = round(360.0 - ((camRot.z + 360.0) % 360.0)),
                        streetName = streetName,
                        areaName = zoneName,
                    }
                }
            })

            Citizen.Wait(Config.TickRate)
        end
    end
end)

if Config.Debug == true then
    RegisterCommand('setHealth', function (_, args)
        local ped = PlayerPedId()
        local health = tonumber(args[1]) + 100
        SetEntityHealth(ped, health)
    end)

    RegisterCommand('setArmor', function (_, args)
        local ped = PlayerPedId()
        local armor = tonumber(args[1])
        SetPedArmour(ped, armor)
    end)
end