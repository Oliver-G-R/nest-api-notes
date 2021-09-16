import { NoteDto } from './../dtos/note.dtos';
import { Injectable} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import {INote} from '../interface/INote'

@Injectable()
export class NoteService {
    constructor(@InjectModel('Note') private readonly noteModel: Model<INote>){}

    async createNote(note:NoteDto):Promise<INote>{
        const newNote = new this.noteModel(note)
        return await newNote.save()
    }

    async deleteNote(id:string):Promise<any>{
        const deleteNote = await this.noteModel.findByIdAndDelete(id)
        return deleteNote
    }

    async getAllNotes():Promise<INote[]>{
        const notes = await this.noteModel.find()
        return notes
    }

    async getNoteById(id:string):Promise<INote>{
        const note = await this.noteModel.findById(id)
        return note
    }

    async updateNote(id:string, noteUpdate:NoteDto):Promise<INote>{
        const note = await this.noteModel.findByIdAndUpdate(id, noteUpdate, {new: true})
        return note
    }
}