import { ConflictException, Injectable } from '@nestjs/common';
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

    const cursoJaExiste = await this.buscarPorTitulo(titulo);

    if (cursoJaExiste) {
      throw new ConflictException('Um curso com esse nome ja existe.');
    }

    const novoCurso = this.cursosFactory.criar(titulo, descricao);
    return await this.cursosRepository.salvar(novoCurso);
  }

  async buscarPorTitulo(titulo: string) {
    return await this.cursosRepository.buscarPorTitulo(titulo);
  }

  async listar() {
    return await this.cursosRepository.listarTodos();
  }
}
