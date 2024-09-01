import { Curso } from 'src/cursos/domain/curso';
import { CursoEntity } from '../entities/curso.entity';

export class CursoMapper {
  static paraDominio(cursoEntity: CursoEntity): Curso {
    const model = new Curso(
      cursoEntity.id,
      cursoEntity.titulo,
      cursoEntity.descricao,
      cursoEntity.professores,
      cursoEntity.alunos,
    );
    return model;
  }

  static paraPersistencia(curso: Curso) {
    const entity = new CursoEntity();
    entity.id = curso.id;
    entity.titulo = curso.titulo;
    entity.descricao = curso.descricao;
    entity.professores = curso.professores;
    entity.alunos = curso.alunos;
    return entity;
  }
}
