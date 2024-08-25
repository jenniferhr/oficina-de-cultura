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
}
