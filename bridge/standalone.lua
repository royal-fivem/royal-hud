if Config.Framework == 'STANDALONE' then

    bridge = {}
    local playerLoaded = true

    -- there is no hunger or thirst to get
    function bridge.getPlayerStatus()
        return 0, 0
    end

    function bridge.isPlayerLoaded()
        return Config.Debug or playerLoaded
    end

end