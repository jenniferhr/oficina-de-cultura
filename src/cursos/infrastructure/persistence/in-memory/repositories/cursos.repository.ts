import { Injectable } from '@nestjs/common';
import { CursosRepository } from 'src/cursos/application/ports/cursos.repository';
import { CursoEntity } from '../entities/curso.entity';
import { Curso } from 'src/cursos/domain/curso';
import { CursoMapper } from '../mappers/curso.mapper';

@Injectable()
export class InMemoryCursosRepository implements CursosRepository {
  private readonly cursos = new Map<string, CursoEntity>();

  async salvar(curso: Curso): Promise<Curso> {
    console.log(`Salvando curso ${curso.titulo}`);
    const persistenceModel = CursoMapper.paraPersistencia(curso);
    this.cursos.set(persistenceModel.id, persistenceModel);
    const newEntity = this.cursos.get(persistenceModel.id);
    return CursoMapper.paraDominio(newEntity);
  }

  async listarTodos(): Promise<Curso[]> {
    const entities = Array.from(this.cursos.values());
    return entities.map((item) => CursoMapper.paraDominio(item));
  }
}
