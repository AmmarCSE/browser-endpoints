//general util methods
const generateEndPoint = (method, url) => {
    //just keep it simple for now and use dot seperator instead of hashes
    method+'.'+url
}

//implement custom event emitting and listening
let subscriptions = {};

const broadcast = (method, url) => {
    const endpoint = generateEndPoint(method, url);
    subscriptions[endpoint](); 
}

const subscribe = (method, url, execute) => {
    const endpoint = generateEndPoint(method, url);
    subscriptions[endpoint] = execute; 
}

export function operator() {
    return {
        broadcast,
        subscribe
    }
}
