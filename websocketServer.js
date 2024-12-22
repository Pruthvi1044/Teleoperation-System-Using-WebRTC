// websocketServer.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
    console.log('A client connected');

    ws.on('message', (message) => {
        // Ensure the message is treated as a string
        const messageStr = message.toString();
        console.log('Received:', messageStr);

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(messageStr);
            }
        });
    });

    ws.on('close', () => {
        console.log('A client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');