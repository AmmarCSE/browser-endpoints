import XMLHttpRequestProxy from '../src/network/proxy-ajax'
import browserServer from '../src/browser-server/server'

let app = browserServer()
app.get('wechat', function(){
    console.log('wechat')
})
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  };
  xhttp.open("GET", "wechat", true);
  xhttp.send();
const App = true;
export default App
