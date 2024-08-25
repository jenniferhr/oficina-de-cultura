import { Injectable } from '@nestjs/common';
import { Aluno } from '../aluno';
import { randomUUID } from 'crypto';

@Injectable()
export class AlunoFactory {
  criar(nome: string, endereco: string, email: string, telefone: string) {
    const alunoId = randomUUID();
    const alunoCurso = [];
    return new Aluno(alunoId, nome, endereco, email, telefone, alunoCurso);
  }
}
