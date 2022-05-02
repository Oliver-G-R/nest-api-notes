import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './controllers/notes.controller';
import { NotesModule } from './modules/notes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/notes', {
      useNewUrlParser: true,
    }),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
