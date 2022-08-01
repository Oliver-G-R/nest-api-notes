import { NoteDto } from "./dtos/note.dtos"
import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { isValidObjectId, Model } from "mongoose"
import { Note } from './schema/NoteSchema'

@Injectable()
export class NoteService {
  constructor(@InjectModel("Note") private readonly noteModel: Model<Note>) {}

  async createNote(note: NoteDto): Promise<Note> {
    const newNote = new this.noteModel(note)
    return await newNote.save()
  }

  async deleteNote(id: string): Promise<{message: string}> {
    if (!isValidObjectId(id)) throw new BadRequestException("id is not valid")

    const findNote = await this.noteModel.findById(id)
    if (!findNote) throw new BadRequestException("Note not found")

    await findNote.remove()

    return {
      message: "Note deleted"
    }
  }

  async getAllNotes(): Promise<Note[]> {
    const notes = await this.noteModel.find()
    return notes
  }

  async getNoteById(id: string): Promise<Note> {
    if (!isValidObjectId(id)) throw new BadRequestException("id is not valid")

    const note = await this.noteModel.findById(id)
    return note
  }

  async updateNote(id: string, noteUpdate: NoteDto): Promise<Note> {
    if (!isValidObjectId(id)) throw new BadRequestException("id is not valid")

    const findNote = await this.noteModel.findById(id)
    if (!findNote) throw new BadRequestException("Note not found")

    const note = await findNote.updateOne(noteUpdate, { new: true })
    return note
  }
}
