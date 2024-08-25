import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { CursosService } from '../../application/cursos.service';

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
