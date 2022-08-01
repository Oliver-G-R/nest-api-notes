import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from "@nestjs/common"
import { NoteDto } from "./dtos/note.dtos"
import { NoteService } from "./note.service"
import { Note } from './schema/NoteSchema'

@Controller("notes")
export class NotesController {
  constructor(private noteService: NoteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllNotes(): Promise<Note[]> {
    return this.noteService.getAllNotes()
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  async getNoteById(@Param("id") idNote): Promise<Note> {
    return this.noteService.getNoteById(idNote)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNote(@Body() payload: NoteDto): Promise<Note> {
    return this.noteService.createNote(payload)
  }

  @Put("/:id")
  @HttpCode(HttpStatus.OK)
  async updateNote(
    @Param("id") idNote,
    @Body() payload: NoteDto
  ): Promise<Note> {
    return this.noteService.updateNote(idNote, payload)
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  async deleteNote(@Param("id") idNote): Promise<{message: string}> {
    return this.noteService.deleteNote(idNote)
  }
}
