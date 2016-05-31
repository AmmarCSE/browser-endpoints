import { operator } from '../network/operator'
import {getConfig} from '../config'

//proxy XMLHttpRequest so that it may be extended(without overriding)
//regular XMLHttpRequests will still function normally
const XMLHttpRequestProxy = (proxied => {
  XMLHttpRequest = function() {
    let usesExtended = false;
    let config = getConfig();
    //cannot use apply directly since we want a 'new' version
    let wrapped = new (Function.prototype.bind.apply(proxied, arguments));

    (proxied => {
      wrapped.open = function(method, url) {
        //lets preserve the method, url so we can use them in our extended functionality
        this.method = method.toLowerCase();
        this.url = url;

        //check if its a call to our extended functionality and not just a regular request
        usesExtended = config.identifier.test(this.url);
        if(usesExtended){
            let xhttp = this;
            //ovverride read-only native properties
            //only do this if we're sure we are using extended functionality 
            ['responseText', 'response', 'readyState', 'status'].forEach(function(property) {
                Object.defineProperty(xhttp, property, {
                    writable: true
                });
            });

            this.triggerReadyStateChange = (readyState) => {
                this.readyState = readyState;
                this.onreadystatechange();
            }

            this.triggerReadyStateChange(1);
        }

        return proxied.apply(this, arguments);
      };
    })(wrapped.open);

    (proxied => {
      wrapped.send = function() {
        //check if its a call to our extended functionality and not just a regular request
        if(usesExtended){
            operator.broadcast(this.method, this.url, this);
            this.triggerReadyStateChange(2);
        }
        else{
            return proxied.apply(this, arguments);
        }
      };
    })(wrapped.send);

    return wrapped;
  };
})(XMLHttpRequest);

export { XMLHttpRequestProxy }
