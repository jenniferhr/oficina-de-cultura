import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunosController } from '../presenter/http/alunos.controller';
import { AlunoFactory } from '../domain/factories/aluno-factory';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, AlunoFactory],
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
