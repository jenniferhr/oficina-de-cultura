import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/application/alunos.module';
import { CoreModule } from './alunos/core/core.module';
import { ApplicationBootstrapOptions } from './alunos/common/interfaces/application-bootstrap-options.interface';
import { AlunoInfrastructureModule } from './alunos/infrastructure/aluno-infrastructure.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options), // Aqui entram as opções de configuração do banco de dados
        AlunosModule.comInfraestrutura(
          AlunoInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
