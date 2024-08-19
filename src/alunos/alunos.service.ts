import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { AlunosRepository } from './alunos.repository';

@Injectable()
export class AlunosService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  create(createAlunoDto: CreateAlunoDto) {
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
