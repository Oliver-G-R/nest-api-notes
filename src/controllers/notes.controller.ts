import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Res
} from "@nestjs/common";
import { NoteDto } from "../dtos/note.dtos";
import { NoteService } from "../services/note.service";

@Controller("notes")
export class NotesController {
  constructor(private noteService: NoteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllNotes(@Res() res): Promise<Response> {
    const notes = await this.noteService.getAllNotes();

    if (!notes) throw new NotFoundException("No se encontro ninguna nota");

    return res.json(notes);
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  async getNoteById(@Param("id") idNote, @Res() res): Promise<Response> {
    const checkId: RegExpMatchArray | null = idNote.match(/^[0-9a-fA-F]{24}$/);

    if (!checkId) throw new NotFoundException(`El id ${idNote} no es valido`);

    const note = await this.noteService.getNoteById(idNote);
    if (!note) throw new NotFoundException("No se encontro ninguna nota");

    return res.json(note);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createNote(@Res() res, @Body() payload: NoteDto): Promise<Response> {
    const { title, description, done } = payload;
    if (!title || !description || !done) {
      throw new BadRequestException("Verfica los datos algunos son necesarios");
    }

    try {
      const note = await this.noteService.createNote(payload);
      if (!note) throw new BadRequestException("Error al crear la nota");

      return res.json(note);
    } catch (error) {
      throw new InternalServerErrorException("Error con el servidor intenta más tarde");
    }
  }

  @Put("/:id")
  @HttpCode(HttpStatus.OK)
  async updateNote(
    @Param("id") idNote,
    @Res() res,
    @Body() payload: NoteDto
  ): Promise<Response> {
    const checkId: RegExpMatchArray | null = idNote.match(/^[0-9a-fA-F]{24}$/);
    const { title, description, done } = payload;

    if (!checkId) throw new NotFoundException(`El id ${idNote} no es valido`);

    if (!title || !description || !done) {
      throw new BadRequestException("Verfica los datos algunos son necesarios");
    }

    const findNote = await this.noteService.getNoteById(idNote);

    if (!findNote) {
      throw new NotFoundException("No se encontro la nota para editar");
    }

    try {
      const note = await this.noteService.updateNote(idNote, payload);
      return res.json(note);
    } catch (error) {
      throw new InternalServerErrorException("Error con el servidor intenta más tarde");
    }
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  async deleteNote(@Res() res, @Param("id") idNote): Promise<Response> {
    const checkId: RegExpMatchArray | null = idNote.match(/^[0-9a-fA-F]{24}$/);
    if (!checkId) throw new NotFoundException(`El id ${idNote} no es valido`);

    try {
      const findNote = await this.noteService.getNoteById(idNote);

      if (!findNote) {
        throw new NotFoundException("No se encontro la nota para editar");
      }

      return res.json({ msg: "Se elimino la nota" });
    } catch (error) {
      throw new InternalServerErrorException("Error con el servidor intenta más tarde");
    }
  }
}
