import { Module } from '@nestjs/common';
import { AlunosRepository } from '../../../application/ports/alunos.repository';
import { InFileAlunosRepository } from './repositories/aluno.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlunosRepository,
      useClass: InFileAlunosRepository, // É aqui que nós vinculamos uma porta e a um adaptador (a ideia aqui é dizer para o NestJS usar o InMemoryAlunoRepository sempre que alguém pedir por um AlunoRepository - isso facilita muito a troca de adaptadores, vc não precisa mudar nada no resto do código, só aqui).
    },
  ],
  exports: [AlunosRepository],
})
export class InFileAlunosPersistenceModule {}
