const fs = require("fs")

const {WebSocketServer} = require('ws');
const wss = new WebSocketServer({ noServer: true});
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
  
    ws.send('something');
});
  


// Create a server object:
const http = require('http')
const port = 8080
const server = http.createServer(function (req, res) {
    try {
        if (req.url === "/") {
            res.write(fs.readFileSync("./home.html"))
        }

        else {
            res.write(fs.readFileSync(`./${req.url}`));
        }
        res.end();

        
    }
    catch (error) {
        console.log(req.url);

        console.log(error)
        res.write("404");
        res.end();
    }
})

server.on('upgrade', function upgrade(request, socket, head) {
    console.log('Parsing websocket request...');
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});

// Set up our server so it will listen on the port
server.listen(port, function (error) {

    // Checking any error occur while listening on port
    if (error) {
        console.log('Something went wrong', error);
    }
    // Else sent message of listening
    else {
        console.log('Server is listening on port' + port);
    }
})

