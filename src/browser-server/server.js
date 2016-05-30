import { operator } from '../network/operator'

const methods = ['get', 'post', 'put']
export config = { identifier: /^\[be\]/, networkDelay: 700 };
const registrar = {};

for(let method of methods){
    registrar[method] = (capture, execute) => {
        operator.subscribe(method, capture, execute)
    }
}

export default function browserServer(configSettings = config){
    config = config

    const api = {}
    for(let method in registrar){
        api[method] = registrar[method]
    }

    return api
}
