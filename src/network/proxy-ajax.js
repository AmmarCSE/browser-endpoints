import { operator } from '../network/operator'
import { config } from '../browser-server/server'

//proxy XMLHttpRequest so that it may be extended(without overriding)
//regular XMLHttpRequests will still function normally
const XMLHttpRequestProxy = (proxied => {
  XMLHttpRequest = function() {
    //cannot use apply directly since we want a 'new' version
    let wrapped = new (Function.prototype.bind.apply(proxied, arguments));

    (proxied => {
      wrapped.open = function(method, url) {
        //lets preserve the method, url so we can use them in our extended functionality
        wrapped.method = method.toLowerCase();
        wrapped.url = url;

        return proxied.apply(this, arguments);
      };
    })(wrapped.open);

    (proxied => {
      wrapped.send = function() {
        //check if its a call to our extended functionality and not just a regular request
        if(config.indentifier.test(wrapped.url){
            operator.broadcast(wrapped.method, wrapped.url);
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
