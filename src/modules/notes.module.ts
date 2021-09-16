import { Module } from '@nestjs/common';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from '../schemas/NoteSchema';
import { NotesController } from '../controllers/notes.controller';
import { NoteService } from '../services/note.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Note', schema: NoteSchema}])],
  providers: [NoteService],
  controllers: [NotesController]
})
export class NotesModule {}