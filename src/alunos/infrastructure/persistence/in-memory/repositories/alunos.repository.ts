import { Injectable } from '@nestjs/common';
import { AlunosRepository } from '../../../../application/ports/alunos.repository';
import { AlunoEntity } from '../entities/aluno.entity';
import { Aluno } from '../../../../domain/aluno';
import { AlunoMapper } from '../mappers/aluno.mapper';
import { Curso } from 'src/cursos/domain/curso';

@Injectable()
export class InMemoryAlunosRepository implements AlunosRepository {
  private readonly alunos = new Map<string, AlunoEntity>();

  async salvar(aluno: Aluno): Promise<Aluno> {
    console.log(`Salvando aluno ${aluno.nome}`);
    const persistenceModel = AlunoMapper.paraPersistencia(aluno);
    this.alunos.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alunos.get(persistenceModel.id);
    return AlunoMapper.paraDominio(newEntity);
  }

  async listarTodos(): Promise<Aluno[]> {
    const entities = Array.from(this.alunos.values());
    return entities.map((item) => AlunoMapper.paraDominio(item));
  }

  async buscarPorEmail(email: string): Promise<Aluno> {
    const entities = Array.from(this.alunos.values());
    const alunoEncontrado = entities.find((item) => item.email === email);
    if (!alunoEncontrado) {
      return null;
    }
    return AlunoMapper.paraDominio(alunoEncontrado);
  }

  async matricularEmCurso(aluno: Aluno, curso: Curso): Promise<Aluno> {
    const alunoPersistido = this.alunos.get(aluno.id);

    if (!alunoPersistido) {
      throw new Error(`Aluno com ID ${aluno.id} não encontrado.`);
    }

    // Adicionar o curso à lista de cursos da entidade persistida
    alunoPersistido.cursos.push(curso);

    // Atualizar o Map com a entidade de aluno modificada
    this.alunos.set(alunoPersistido.id, alunoPersistido);

    // Retornar o aluno atualizado no formato de domínio
    return AlunoMapper.paraDominio(alunoPersistido);
  }
}

// Esse é o nosso adapter para persitencia em memória
