import { operator } from '../network/operator'

const methods = ['get', 'post', 'put']
const registrar = {};

for(let method of methods){
    registrar[method] = (capture, execute) => {
        operator.subscribe(method, capture, execute)
    }
}

export default function browserServer(){
    const api = {}
    for(let method in registrar){
        api[method] = registrar[method]
    }

    return api
}
