import { Aluno } from 'src/alunos/domain/aluno';
import { Curso } from 'src/cursos/domain/curso';

export abstract class AlunosRepository {
  abstract salvar(aluno: Aluno): Promise<Aluno>;
  abstract listarTodos(): Promise<Aluno[]>;
  abstract buscarPorEmail(email: string): Promise<Aluno>;
  abstract matricularEmCurso(aluno: Aluno, curso: Curso): Promise<Aluno>;
}
