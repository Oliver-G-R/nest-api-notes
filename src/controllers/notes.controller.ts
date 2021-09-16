import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { NoteDto } from '../dtos/note.dtos';
import { NoteService } from '../services/note.service';

@Controller('notes')
export class NotesController {
    constructor(private noteService: NoteService) { }

    @Get()
    async getAllNotes(@Res() res):Promise<Response> {
        try {
            const notes = await this.noteService.getAllNotes()
            return res.status(HttpStatus.OK).json({
                notes
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                msg: 'Error in the server',
            })
        }

    }

    @Get('/:id')
    async getNoteById(@Param('id') id, @Res() res):Promise<Response> {
        try {
            const note = await this.noteService.getNoteById(id)
            return res.status(HttpStatus.OK).json({
                note
            })
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                msg: 'Error in the server',
            })
        }

    }

    @Post()
    async createNote(@Res() res, @Body() noteDto: NoteDto, ):Promise<Response> {
        try {
            const note = await this.noteService.createNote(noteDto)
            return res.status(HttpStatus.CREATED).json({
                msg: 'Note created',
                note
            })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                msg: 'Error in the server',
            })
        }

    }

    @Put('/:id')
    async updateNote(@Param('id') id, @Res() res, @Body() noteDto: NoteDto, ):Promise<Response> {
        try {
            const note = await this.noteService.updateNote(id, noteDto)
            return res.status(HttpStatus.OK).json({
                msg: 'Updated note',
                note
            })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                msg: 'Error in the server',
            })
        }

    }


    @Delete('/:id')
    async deleteNote(@Res() res, @Param('id') id):Promise<Response> {
        try {
            const note = await this.noteService.deleteNote(id)

            return note === null 
            ? res.status(HttpStatus.BAD_REQUEST).json({msg: 'Note could not be removed'}) 
            : res.status(HttpStatus.OK).json({msg:'Note has been removed'})

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                msg: 'Error in the server',
            })
        }

    }
}
