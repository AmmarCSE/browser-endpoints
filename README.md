# browser-endpoints

browser-endpoints is a client side plugin used to simulate server endpoints in the browser. This library allows you to replicate HTTP requests to an endpoint in your browser and recieve a response as if communication was taking place with a server. 

This facilitation is made possible primarily via two prerogatives implemented by this plugin:

#### XMLHTTPRequest extension
The native `XMLHTTPRequest` object is overridden and wrapped to implement the extended functionality provided. This is done in an unobtrusive manner such that regular HTTP requests via the object are untouched. Only requests which fit a specified identifier are overriden by the extended functionality. Making requests to virtual endpoints do not require any extra steps and should be made as if making a regular HTTP request. 

#### Endpoint framework
A framework is provided by the plugin which mimics the express-js api in order to minimize any learning overhead needed in using the api. Endpoints can be registered via conventional methods such as get, post, put, etc., and the conventional request and response objects will be injected into the callback provided:
```     
//global object exposed by the plugin
var app = browserServer();

//*[be]* is capture identifier which can be specified in the config
app.get('[be]/search', function(req, res){
    var params = req.params;
    .
    .
    .
    var response = {success: true, message: "1 2 3"};
    res.send(response);
});
```
