export function getConfig(){
    return config
}
export function setConfig(configSettings){
    config = configSettings
}

let config = { identifier: /^\[be\]/, networkDelay: 700 }

