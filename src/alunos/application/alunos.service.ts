import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAlunoCommand } from './commands/create-aluno-command';
import { AlunoFactory } from '../domain/factories/aluno-factory';
import { AlunosRepository } from './ports/alunos.repository';

@Injectable()
export class AlunosService {
  constructor(
    private readonly alunosRepository: AlunosRepository,
    private readonly alunoFactory: AlunoFactory,
  ) {}

  criar(createAlunoCommand: CreateAlunoCommand) {
    const { nome, endereco, telefone, email } = createAlunoCommand;

    this.validarSeJaExiste(email);

    const novoAluno = this.alunoFactory.criar(nome, endereco, telefone, email);

    return this.alunosRepository.salvar(novoAluno);
  }

  private validarSeJaExiste(email: string) {
    const alunoJaExiste = this.alunosRepository.buscarPorEmail(email);

    if (alunoJaExiste) {
      throw new ConflictException(
        'Um aluno com esse email já está cadastrado.',
      );
    }
  }

  listar() {
    return this.alunosRepository.listarTodos();
  }
}
