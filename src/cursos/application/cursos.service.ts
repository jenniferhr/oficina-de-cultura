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

    await this.validarSeJaExiste(titulo);

    const novoCurso = this.cursosFactory.criar(titulo, descricao);
    return await this.cursosRepository.salvar(novoCurso);
  }

  private async validarSeJaExiste(titulo: string) {
    const cursoJaExiste = await this.cursosRepository.buscarPorTitulo(titulo);

    if (cursoJaExiste) {
      throw new ConflictException('Um curso com esse nome ja existe.');
    }
  }

  async listar() {
    return await this.cursosRepository.listarTodos();
  }
}
