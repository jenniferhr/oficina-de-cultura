import { Aluno } from 'src/alunos/domain/aluno';

export abstract class AlunosRepository {
  abstract salvar(aluno: Aluno): Promise<Aluno>;
  abstract listarTodos(): Promise<Aluno[]>;
  abstract buscarPorEmail(email: string): Promise<Aluno>;
}
