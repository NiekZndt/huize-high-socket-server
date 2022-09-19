import WebSocket, {WebSocketServer} from 'ws';
import * as readLine from "readline";

export class SocketController {
    private socket_url = 'ws://130.89.173.119:8080/socket';
    private server = new WebSocketServer({ port: 8080 });
    private data = 0;
    private clients = []
    private rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    constructor() {
        this.openServer();
        this.broadcastData();
    }

    private openServer(): void
    {
        this.server.on('connection', this.connectionReceived);
        console.log(`Listening '${this.socket_url}'`);
    }

    private connectionReceived = (ws: any, req: any) => {
        console.log('Connection received: ', req.socket.remoteAddress);
        this.clients.push(ws)
        ws.on('message', function message(data) {
            console.log('received server: %s', data);
        });
    }

    private broadcastData = () => {
        this.rl.question('Enter a message: ', (message) =>{
            this.clients.forEach(client =>
                client.readyState === WebSocket.OPEN && client.send(message)
            )
            this.broadcastData();
        })
    }
}