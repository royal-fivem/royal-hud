if Config.Framework == 'QBX' then

    bridge = {}
    local playerLoaded = false

    RegisterNetEvent("QBCore:Client:OnPlayerLoaded", function()
        playerLoaded = true
        dprint("Player Successfully Loaded")
    end)

    function bridge.getPlayerStatus()
        local player = exports.qbx_core:GetPlayerData()

        if player and player.metadata then
            return math.floor(player.metadata.hunger), math.floor(player.metadata.thirst)
        end

        return 0, 0
    end

    function bridge.isPlayerLoaded()
        return playerLoaded
    end

end