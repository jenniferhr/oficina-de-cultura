import { Controller, Get, Post, Body } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './presenter/http/dto/create-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }
}
