import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { CursosService } from '../../application/cursos.service';
import { CreateCursoCommand } from 'src/cursos/application/commands/create-curso-command';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  cadastrar(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.criar(
      new CreateCursoCommand(createCursoDto.titulo, createCursoDto.descricao),
    );
  }

  @Get()
  listar() {
    return this.cursosService.listar();
  }
}
