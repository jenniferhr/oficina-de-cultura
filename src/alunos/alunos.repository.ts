import { Injectable } from '@nestjs/common';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunosRepository {
  private readonly alunos: Aluno[] = [];

  salvar(aluno: Aluno): void {
    this.alunos.push(aluno);
    console.log(`salvando aluno ${aluno.nome}`);
  }

  listarTodos(): Aluno[] {
    return this.alunos;
  }
}
