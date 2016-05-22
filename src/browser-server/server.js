import operator from 'operator'

const methods = ['get', 'post', 'put']
const registrar = {};

for(var method of methods){
    registrar.method = (capture, execute) => {
        operator.subscribe(method, capture, execute)
    }
}

export function browserServer(){
    const api = {}
    for(var method in registrar){
        api[method] = registrar[method]
    }

    return api
}
