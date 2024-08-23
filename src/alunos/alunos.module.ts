import { Module } from '@nestjs/common';
import { AlunosService } from './application/alunos.service';
import { AlunosController } from './presenter/http/alunos.controller';
import { AlunosRepository } from './alunos.repository';

@Module({
  controllers: [AlunosController],
  providers: [AlunosService, AlunosRepository],
})
export class AlunosModule {}
