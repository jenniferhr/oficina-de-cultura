import { Aluno } from 'src/alunos/domain/aluno';

export class Curso {
  constructor(
    public readonly id: string,
    public readonly titulo: string,
    public readonly descricao: string,
    public readonly professores: any[],
    public readonly alunos: Aluno[],
  ) {}
}
