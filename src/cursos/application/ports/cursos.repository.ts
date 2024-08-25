import { Curso } from 'src/cursos/domain/curso';

export abstract class CursosRepository {
  abstract salvar(curso: Curso): Promise<Curso>;
  abstract listarTodos(): Promise<Curso[]>;
  abstract buscarPorTitulo(titulo: string): Promise<Curso>;
}
