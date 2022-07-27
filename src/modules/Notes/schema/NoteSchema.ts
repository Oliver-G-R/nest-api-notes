import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

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

export const NoteSchema = SchemaFactory.createForClass(Note)

NoteSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
