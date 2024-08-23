import { Injectable } from '@nestjs/common';
import { Aluno } from './domain/aluno';

@Injectable()
export class AlunosRepository {
  private readonly alunos: Aluno[] = [];

  salvar(aluno: Aluno): Aluno {
    this.alunos.push(aluno);
    console.log(`salvando aluno ${aluno.nome}`);
    return aluno;
  }

  listarTodos(): Aluno[] {
    return this.alunos;
  }
}
