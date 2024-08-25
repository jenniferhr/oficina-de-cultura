export abstract class CursosRepository {
  abstract salvar(curso: any): Promise<any>;
  abstract listarTodos(): Promise<any[]>;
}
