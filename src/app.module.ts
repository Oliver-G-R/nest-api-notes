import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { MongooseModule } from "@nestjs/mongoose"
import { NotesModule } from "./modules/Notes/notes.module"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/notes", {
      useNewUrlParser: true
    }),
    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
