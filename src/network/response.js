import {updateClient} from '../network/operator'

export default function response(method, url){
    function send(load){
        updateClient(method, url, load)
    }

    return {
        send
    }
}
