import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlunoCommand } from './commands/create-aluno-command';
import { AlunoFactory } from '../domain/factories/aluno-factory';
import { AlunosRepository } from './ports/alunos.repository';
import { CursosService } from 'src/cursos/application/cursos.service';

@Injectable()
export class AlunosService {
  constructor(
    private readonly alunosRepository: AlunosRepository,
    private readonly alunoFactory: AlunoFactory,
    private readonly cursosService: CursosService,
  ) {}

  async criar(createAlunoCommand: CreateAlunoCommand) {
    const { nome, endereco, telefone, email } = createAlunoCommand;

    const alunoJaExiste = await this.buscarPorEmail(email);

    if (alunoJaExiste) {
      throw new ConflictException(
        'Um aluno com esse email já está cadastrado.',
      );
    }

    const novoAluno = this.alunoFactory.criar(nome, endereco, telefone, email);

    return await this.alunosRepository.salvar(novoAluno);
  }

  async buscarPorEmail(email: string) {
    return await this.alunosRepository.buscarPorEmail(email);
  }

  async listar() {
    return await this.alunosRepository.listarTodos();
  }

  async matricular(tituloDoCurso: string, emailDoAluno: string) {
    // verifica se aluno e curso ja existem ou nao
    // verifica se o aluno ja esta matriculado no curso ou nao
    // atualizar aluno, adicionando o curso no array cursos (id né?)
    // atualizar curso, adicionando o aluno no array alunos (id?)
    // retorna o objeto curso
    const aluno = await this.buscarPorEmail(emailDoAluno);

    if (!aluno) {
      throw new NotFoundException('Um aluno com esse email não foi encontrado');
    }

    const curso = await this.cursosService.buscarPorTitulo(tituloDoCurso);
    console.log(curso);

    if (!curso) {
      throw new NotFoundException('Um curso com esse nome não foi encontrado');
    }

    return await this.alunosRepository.matricularEmCurso(aluno, curso);
  }
}
