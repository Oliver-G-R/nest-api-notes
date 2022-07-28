import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  readonly description: string

  @IsBoolean()
  @IsNotEmpty()
  readonly done: boolean
}
