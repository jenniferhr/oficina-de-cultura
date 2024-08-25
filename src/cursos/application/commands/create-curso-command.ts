import { Aluno } from 'src/alunos/domain/aluno';
// TODO: criar domain Professor.ts
export class CreateCursoCommand {
  constructor(
    public readonly id: string,
    public readonly titulo: string,
    public readonly descricao: string,
    public readonly professores: any[],
    public readonly alunos: Aluno[],
  ) {}
}
