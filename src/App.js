const App = true;

((proxied) => {
  XMLHttpRequest = function() {
    var s = new (Function.prototype.bind.apply(proxied, arguments));
    //s.open = () => (console.log('wechat'))
    ((proxied) => {
      s.send = function() {
        console.log('yo');
        return proxied.apply(this, arguments);
      };
    })(s.send);
    //console.log(s);
    return s;

  };
})(XMLHttpRequest);

var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  };
  xhttp.open("GET", "wechat", true);
  //xhttp.send();
export default App
