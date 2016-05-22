import operator from 'operator'

//proxy XMLHttpRequest to that it maybe extended(without overriding)
//regular XMLHttpRequests will still function normally
export XMLHttpRequestProxy = (proxied => {
  XMLHttpRequest = function() {
    //cannot use apply directly since we want a 'new' version
    let wrapped = new (Function.prototype.bind.apply(proxied, arguments));

    (proxied => {
      wrapped.open = function(method, url) {
        //lets preserve the method, url so we cn use them in our extended functionality
        wrapped.method = method;
        wrapped.url = url;

        return proxied.apply(this, arguments);
      };
    })(wrapped.open);

    (proxied => {
      wrapped.send = function() {
        //check if its a call to our extended functionality and not just a regular request
        if(wrapped.url == 'wechat'){
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

/*var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  };
  xhttp.open("GET", "wechat", true);
  xhttp.send();
    console.log(xhttp.responseURL);*/
