if Config.Framework == 'STANDALONE' then

    bridge = {}
    local playerLoaded = false

    AddEventHandler("PlayerSpawned", function()
        playerLoaded = true
        dprint("Player Successfully Loaded")
    end)

    -- there is no hunger or thirst to get
    function bridge.getPlayerStatus()
        return 0, 0
    end

    function bridge.isPlayerLoaded()
        return Config.Debug or playerLoaded
    end

end