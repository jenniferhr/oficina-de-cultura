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

    await this.validarSeJaExiste(email);

    const novoAluno = this.alunoFactory.criar(nome, endereco, telefone, email);

    return await this.alunosRepository.salvar(novoAluno);
  }

  private async validarSeJaExiste(email: string) {
    const alunoJaExiste = await this.alunosRepository.buscarPorEmail(email);

    if (alunoJaExiste) {
      throw new ConflictException(
        'Um aluno com esse email já está cadastrado.',
      );
    }
  }

  async listar() {
    return await this.alunosRepository.listarTodos();
  }
}
