import request from '../network/request'
import response from '../network/response'

//general util methods
const generateEndPoint = (method, url) => (
    //just keep it simple for now and use dot seperator instead of hashes
    method+'.'+url
)

//implement custom event emitting and listening
let subscriptions = {}, subscriptionClients = {};

const subscribe = (method, url, execute) => {
    const endpoint = generateEndPoint(method, url);
    subscriptions[endpoint] = execute; 
}

const broadcast = (method, url, client) => {
    const endpoint = generateEndPoint(method, url);
    subscriptionClients[endpoint] = client; 
    subscriptions[endpoint](request(method, url), response(method, url)); 
    client.triggerReadyStateChange(3);
}

export const updateClient = (method, url, load) => {
    const endpoint = generateEndPoint(method, url);
    let client = subscriptionClients[endpoint]; 
    client.response = load;
    client.responseText = load.toString();
    client.status = 200;
    client.triggerReadyStateChange(4);
}

const operator = {
        broadcast,
        subscribe
    }

export { operator }
