import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  done: boolean;
  
}

export const NoteSchema = SchemaFactory.createForClass(Note);

NoteSchema.set('toJSON', {
  transform: (document, returnedObjet) => {
      returnedObjet.id = returnedObjet._id,
      delete returnedObjet._id
      delete returnedObjet.__v
  }
})