import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './presenter/http/dto/create-curso.dto';

@Injectable()
export class CursosService {
  create(createCursoDto: CreateCursoDto) {
    return 'This action adds a new curso';
  }

  findAll() {
    return `This action returns all cursos`;
  }
}
