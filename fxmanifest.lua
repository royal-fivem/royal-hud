fx_version 'cerulean'
lua54 'yes'
use_experimental_fxv2_oal 'yes'
games {'gta5'}

-- ui_page "web/build/index.html"
ui_page 'http://localhost:5173/'

shared_script 'shared/config.lua'

client_scripts {
    'bridge/**/*.lua',
    'client/utils.lua',
    'client/main.lua',
}

files {
    "web/build/index.html",
    "web/build/**/*"
}