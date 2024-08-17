import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { AlunosRepository } from './alunos.repository';

@Injectable()
export class AlunosService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  create(createAlunoDto: CreateAlunoDto) {
    const { nome, endereco, telefone, email } = createAlunoDto;
    const aluno = new Aluno(nome, endereco, telefone, email);

    // verificar se tem outro aluno com o mesmo email
    // pega lista de alunos, verifica se tem algum com o memso email
    // se tiver, lançar exceção

    this.alunosRepository.salvar(aluno);
  }
}
