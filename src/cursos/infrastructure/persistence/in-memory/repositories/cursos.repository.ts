import { Injectable } from '@nestjs/common';
import { CursosRepository } from 'src/cursos/application/ports/cursos.repository';
import { CursoEntity } from '../entities/curso.entity';
import { Curso } from 'src/cursos/domain/curso';
import { CursoMapper } from '../mappers/curso.mapper';
import { Aluno } from 'src/alunos/domain/aluno';

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

  async buscarPorTitulo(titulo: string): Promise<Curso> {
    console.log(this.cursos);
    const entities = Array.from(this.cursos.values());
    const cursoEncontrado = entities.find((item) => item.titulo === titulo);
    if (!cursoEncontrado) {
      return null;
    }
    return CursoMapper.paraDominio(cursoEncontrado);
  }

  async matricularAluno(aluno: Aluno, curso: Curso): Promise<Curso> {
    const cursoEntity = Array.from(this.cursos.values()).find(
      (item) => item.id === curso.id,
    );

    if (!cursoEntity) {
      throw new Error('Curso não encontrado');
    }

    // Verificar se o aluno já está matriculado no curso
    if (cursoEntity.alunos.includes(aluno)) {
      throw new Error('Aluno já está matriculado neste curso');
    }

    // Adicionar o aluno à lista de alunos do curso
    cursoEntity.alunos.push(aluno);

    // Atualizar o curso no Map
    this.cursos.set(cursoEntity.id, cursoEntity);

    return CursoMapper.paraDominio(cursoEntity);
  }
}
