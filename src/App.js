const App = true;

(proxied => {
  XMLHttpRequest = function() {
    let wrapped = new (Function.prototype.bind.apply(proxied, arguments));
    (proxied => {
      wrapped.open = function(method, url) {
        wrapped.method = method;
        wrapped.url = url;
        return proxied.apply(this, arguments);
      };
    })(wrapped.open);
    (proxied => {
      wrapped.send = function() {
console.log(wrapped.url);
        if(wrapped.url == 'wechat'){
console.log('yolo');
        }
        else{
console.log('loyo');
            return proxied.apply(this, arguments);
        }
      };
    })(wrapped.send);
    return wrapped;
  };
})(XMLHttpRequest);

var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  };
  xhttp.open("GET", "wechat", true);
  xhttp.send();
    console.log(xhttp.responseURL);
export default App
