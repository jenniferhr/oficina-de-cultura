import { Injectable } from '@nestjs/common';
import { Aluno } from './entities/aluno.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AlunosRepository {
  private readonly alunos: Aluno[] = [];

  salvar(aluno: Aluno): void {
    aluno.id = randomUUID();
    this.alunos.push(aluno);
    console.log(`salvando aluno ${aluno.nome}`);
  }
}
