import { Module } from "@nestjs/common"
// Mongoose
import { MongooseModule } from "@nestjs/mongoose"
import { NoteSchema } from "./schema/NoteSchema"
import { NotesController } from "./notes.controller"
import { NoteService } from "./note.service"
import { NotesGateway } from "./note.gateway"

@Module({
  imports: [MongooseModule.forFeature([{ name: "Note", schema: NoteSchema }])],
  providers: [NoteService, NotesGateway],
  controllers: [NotesController]
})
export class NotesModule {}
