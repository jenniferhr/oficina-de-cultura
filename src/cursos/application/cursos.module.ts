import { DynamicModule, Module, Type } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from '../presenter/http/cursos.controller';
import { CursosFactory } from '../domain/factories/cursos-factory';
import { AlunosModule } from 'src/alunos/application/alunos.module';

@Module({
  controllers: [CursosController],
  providers: [CursosService, CursosFactory],
  imports: [AlunosModule],
})
export class CursosModule {
  // Aqui criamos um método estático que nos permite escolher qual módulo de persistência queremos usar.
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: CursosModule,
      imports: [infrastructureModule, AlunosModule], //Essa linha é onde ocorre a injeção do módulo de persistência.
    };
  }
}
