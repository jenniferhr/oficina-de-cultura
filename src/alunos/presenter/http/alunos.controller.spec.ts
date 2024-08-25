import { Test, TestingModule } from '@nestjs/testing';
import { AlunosController } from './alunos.controller';
import { AlunosService } from '../../application/alunos.service';
import { AlunosRepository } from 'src/alunos/application/ports/alunos.repository';

describe('AlunosController', () => {
  let controller: AlunosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunosController],
      providers: [
        AlunosService,
        {
          provide: AlunosRepository,
          useValue: {
            salvar: jest.fn(),
            listarTodos: jest.fn(),
            buscarPorEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AlunosController>(AlunosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
