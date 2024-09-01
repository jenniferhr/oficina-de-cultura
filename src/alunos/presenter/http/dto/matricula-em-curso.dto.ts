import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MatriculaEmCursoDto {
  @IsString()
  @IsNotEmpty()
  tituloDoCurso: string;

  @IsEmail()
  @IsNotEmpty()
  emailDoAluno: string;
}
