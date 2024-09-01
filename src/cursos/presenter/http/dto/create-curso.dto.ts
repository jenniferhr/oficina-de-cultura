import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  descricao: string;
}
