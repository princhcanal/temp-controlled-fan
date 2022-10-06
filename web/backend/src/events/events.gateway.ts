import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SerialPort, ReadlineParser } from 'serialport';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  public server: Server;

  public port: SerialPort;

  public handleConnection() {
    this.port = new SerialPort({
      path: '/dev/cu.usbmodem143401',
      baudRate: 9600,
    });

    const parser = new ReadlineParser();

    this.port.pipe(parser);

    parser.on('data', (data) => {
      this.server.emit('temperature', data);
    });
  }

  @SubscribeMessage('fanSpeed')
  public async handleFanSpeed(@MessageBody() fanSpeed: string) {
    this.port.write(fanSpeed);
  }
}
