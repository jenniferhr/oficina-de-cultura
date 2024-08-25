import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunosController } from '../presenter/http/alunos.controller';
import { AlunoFactory } from '../domain/factories/aluno-factory';
import { AlunosRepository } from './ports/alunos.repository';
import { InMemoryAlunosRepository } from '../infrastructure/persistence/in-memory/repositories/alunos.repository';

@Module({
  controllers: [AlunosController],
  providers: [
    AlunosService,
    AlunoFactory,
    {
      provide: AlunosRepository,
      useClass: InMemoryAlunosRepository,
    },
  ],
  exports: [AlunosService],
})
export class AlunosModule {
  // Aqui criamos um método estático que nos permite escolher qual módulo de persistência queremos usar.
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlunosModule,
      imports: [infrastructureModule], //Essa linha é onde ocorre a injeção do módulo de persistência.
    };
  }
}
