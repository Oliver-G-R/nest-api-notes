import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets"
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface"
import { NoteService } from './note.service'

@WebSocketGateway()
export class NotesGateway implements NestGateway {
  constructor(private noteService:NoteService) {}

  afterInit(server: any) { console.log("firstMessage") }

  handleConnection(socket: any) {
    console.log("connected")
   }

  handleDisconnect(socket: any) { console.log("disconnected") }
}
