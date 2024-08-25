import { Aluno } from 'src/alunos/domain/aluno';

export class CursoEntity {
  id: string;
  titulo: string;
  descricao: string;
  professores: any[];
  alunos: Aluno[];
}
