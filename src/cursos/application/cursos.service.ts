import { ConflictException, Injectable } from '@nestjs/common';
import { CursosRepository } from './ports/cursos.repository';
import { CreateCursoCommand } from './commands/create-curso-command';
import { CursosFactory } from '../domain/factories/cursos-factory';
import { AlunosService } from 'src/alunos/application/alunos.service';

@Injectable()
export class CursosService {
  constructor(
    private readonly cursosRepository: CursosRepository,
    private readonly cursosFactory: CursosFactory,
    private readonly alunosService: AlunosService,
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

  async matricular(tituloDoCurso: string, emailDoAluno: string) {
    // verifica se aluno e curso ja existem
    // atualizar aluno, adicionando o curso no array cursos (id né?)
    // atualizar curso, adicionando o aluno no array alunos (id?)
    // retorna o objeto curso
    const curso = this.validarSeJaExiste(tituloDoCurso);

    const aluno = this.alunosService.validarSeJaExiste(emailDoAluno);
  }
}
