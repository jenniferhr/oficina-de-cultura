import { DynamicModule, Module, Type } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from '../presenter/http/cursos.controller';
import { CursosFactory } from '../domain/factories/cursos-factory';
import { CursosRepository } from './ports/cursos.repository';
import { InMemoryCursosRepository } from '../infrastructure/persistence/in-memory/repositories/cursos.repository';

@Module({
  controllers: [CursosController],
  providers: [
    CursosService,
    CursosFactory,
    {
      provide: CursosRepository,
      useClass: InMemoryCursosRepository,
    },
  ],
  exports: [CursosService],
})
export class CursosModule {
  // Aqui criamos um método estático que nos permite escolher qual módulo de persistência queremos usar.
  static comInfraestrutura(infrastructureModule: Type | DynamicModule) {
    return {
      module: CursosModule,
      imports: [infrastructureModule], //Essa linha é onde ocorre a injeção do módulo de persistência.
    };
  }
}
