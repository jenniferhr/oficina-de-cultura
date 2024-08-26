import { Curso } from 'src/cursos/domain/curso';

export class AlunoEntity {
  id: string;
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
  cursos: Curso[];
}
