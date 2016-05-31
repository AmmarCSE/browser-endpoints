import { operator } from '../network/operator'
import setConfig from '../config'

export default function browserServer(configSettings = null){
    configSettings && setConfig(configSettings)

    const api = {}
    for(let method in registrar){
        api[method] = registrar[method]
    }

    return api
}

const methods = ['get', 'post', 'put']
const registrar = {}

for(let method of methods){
    registrar[method] = (capture, execute) => {
        operator.subscribe(method, capture, execute)
    }
}

