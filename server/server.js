var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
const cors = require('cors');
var apiProxy = httpProxy.createProxyServer();
const port = 3000;
var serverOne = 'http://tbay-description.us-east-2.elasticbeanstalk.com/',
    serverTwo = 'http://ec2-54-193-123-144.us-west-1.compute.amazonaws.com/';

app.use(cors())
app.use(express.static('dist'));

app.all("/", function(req, res) {
  apiProxy.web(req, res, {target: serverOne});
  apiProxy.web(req, res, {target: serverTwo});
})
app.all("/app1/*", function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: serverOne});
});

app.all("/app2/*", function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: ServerTwo});
});

app.all("/app3/*", function(req, res) {
    console.log('redirecting to Server3');
    apiProxy.web(req, res, {target: ServerThree});
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}!`)
});