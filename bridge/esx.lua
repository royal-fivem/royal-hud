if Config.Framework == 'ESX' then
    ESX = exports["es_extended"]:getSharedObject()

    bridge = {}
    local values = { hunger = 0, thirst = 0 }
    local playerLoaded = ESX.PlayerLoaded

    AddEventHandler("esx_status:onTick", function(data)
        for i = 1, #data do
            if data[i].name == "hunger" then
                values.hunger = math.floor(data[i].percent)
            end

            if data[i].name == "thirst" then
                values.thirst = math.floor(data[i].percent)
            end
        end
    end)

    function bridge.getPlayerStatus()
        return values.hunger or 0, values.thirst or 0
    end

    function bridge.isPlayerLoaded()
        return Config.Debug or playerLoaded
    end

end