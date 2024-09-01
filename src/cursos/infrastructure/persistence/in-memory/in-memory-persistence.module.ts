import { Module } from '@nestjs/common';
import { CursosRepository } from 'src/cursos/application/ports/cursos.repository';
import { InMemoryCursosRepository } from './repositories/cursos.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: CursosRepository,
      useClass: InMemoryCursosRepository, // É aqui que nós vinculamos uma porta e a um adaptador (a ideia aqui é dizer para o NestJS usar o InMemoryAlunoRepository sempre que alguém pedir por um AlunoRepository - isso facilita muito a troca de adaptadores, vc não precisa mudar nada no resto do código, só aqui).
    },
  ],
  exports: [CursosRepository],
})
export class InMemoryCursosPersistenceModule {}
