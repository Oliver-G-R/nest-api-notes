import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsBoolean()
  @IsNotEmpty()
  readonly done: boolean
}
