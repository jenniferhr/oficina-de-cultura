import { Module } from '@nestjs/common';
import { InMemoryCursosPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';

@Module({})
export class CursoInfrastructureModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static use(driver: 'in-file' | 'in-memory') {
    const persistenceModule = InMemoryCursosPersistenceModule;

    return {
      module: CursoInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
