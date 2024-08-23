import { ConflictException, Injectable } from '@nestjs/common';
import { AlunosRepository } from '../alunos.repository';
import { Aluno } from '../domain/aluno';
import { CreateAlunoCommand } from './commands/create-aluno-command';

@Injectable()
export class AlunosService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  create(createAlunoDto: CreateAlunoCommand) {
    const { nome, endereco, telefone, email } = createAlunoDto;

    const alunosExistentes = this.alunosRepository.listarTodos();

    const alunoJaExiste = alunosExistentes.filter(
      (aluno) => aluno.email === email,
    );
    if (alunoJaExiste.length) {
      throw new ConflictException(
        'Um aluno com esse email já está cadastrado.',
      );
    }

    const aluno = new Aluno(nome, endereco, telefone, email);

    return this.alunosRepository.salvar(aluno);
  }
}
