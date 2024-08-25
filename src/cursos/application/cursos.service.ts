import { ConflictException, Injectable } from '@nestjs/common';
import { CursosRepository } from './ports/cursos.repository';
import { CreateCursoCommand } from './commands/create-curso-command';
import { CursosFactory } from '../domain/factories/cursos-factory';
import { AlunosService } from 'src/alunos/application/alunos.service';
import { Curso } from '../domain/curso';

@Injectable()
export class CursosService {
  constructor(
    private readonly cursosRepository: CursosRepository,
    private readonly cursosFactory: CursosFactory,
    private readonly alunosService: AlunosService,
  ) {}

  async criar(createCursoCommand: CreateCursoCommand) {
    const { titulo, descricao } = createCursoCommand;

    const cursoJaExiste = await this.buscarPorTitulo(titulo);
    console.log(cursoJaExiste);

    if (cursoJaExiste) {
      throw new ConflictException('Um curso com esse nome ja existe.');
    }

    const novoCurso = this.cursosFactory.criar(titulo, descricao);
    return await this.cursosRepository.salvar(novoCurso);
  }

  private async buscarPorTitulo(titulo: string) {
    return await this.cursosRepository.buscarPorTitulo(titulo);
  }

  async listar() {
    return await this.cursosRepository.listarTodos();
  }

  async matricular(tituloDoCurso: string, emailDoAluno: string) {
    // verifica se aluno e curso ja existem
    // atualizar aluno, adicionando o curso no array cursos (id né?)
    // atualizar curso, adicionando o aluno no array alunos (id?)
    // retorna o objeto curso
    const curso = this.buscarPorTitulo(tituloDoCurso);

    const aluno = this.alunosService.buscarPorEmail(emailDoAluno);
  }
}
