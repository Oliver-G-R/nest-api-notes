import { NOTE_ACTIONS } from "./actions/notes.actions"
import { Note } from "./schema/NoteSchema"
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer
} from "@nestjs/websockets"

@WebSocketGateway({
  cors: true,
  namespace: "notes"
})
export class NotesGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() private server

  handleConnection(client: any, ...args: any[]) {
    console.log("handleConnection")
  }

  handleDisconnect(client: any) {
    console.log("handleDisconnect")
  }

  afterInit(server: any) {
    console.log("afterInit")
  }

  createNote(note: Note) {
    this.server.emit(NOTE_ACTIONS.CREATE_NOTE, note)
  }

  updateNote(note: Note) {
    this.server.emit(NOTE_ACTIONS.UPDATE_NOTE, note)
  }

  deleteNote(id: string) {
    this.server.emit(NOTE_ACTIONS.DELETE_NOTE, id)
  }
}
