import { Injectable } from '@nestjs/common';
import { CursosRepository } from './ports/cursos.repository';
import { CreateCursoCommand } from './commands/create-curso-command';
import { CursosFactory } from '../domain/factories/cursos-factory';

@Injectable()
export class CursosService {
  constructor(
    private readonly cursosRepository: CursosRepository,
    private readonly cursosFactory: CursosFactory,
  ) {}

  async criar(createCursoCommand: CreateCursoCommand) {
    const { titulo, descricao } = createCursoCommand;

    const novoCurso = this.cursosFactory.criar(titulo, descricao);
    return await this.cursosRepository.salvar(novoCurso);
  }

  async listar() {
    return await this.cursosRepository.listarTodos();
  }
}
