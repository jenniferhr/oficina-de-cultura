import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Curso } from '../curso';

@Injectable()
export class CursosFactory {
  criar(titulo: string, descricao: string) {
    const cursoId = randomUUID();
    const cursoProfessores = ['Jack', 'Jô'];
    const cursoAlunos = [];
    return new Curso(cursoId, titulo, descricao, cursoProfessores, cursoAlunos);
  }
}
