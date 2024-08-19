import { Test, TestingModule } from '@nestjs/testing';
import { AlunosService } from './alunos.service';
import { AlunosRepository } from './alunos.repository';
import { randomUUID } from 'crypto';
import { Aluno } from './entities/aluno.entity';
import { ConflictException } from '@nestjs/common';

describe('AlunosService', () => {
  let service: AlunosService;
  let repository: AlunosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunosService,
        {
          provide: AlunosRepository,
          useValue: {
            salvar: jest.fn(),
            listarTodos: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AlunosService>(AlunosService);
    repository = module.get<AlunosRepository>(AlunosRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve lançar exceção de conflito caso tente cadastrar com email que já existe', () => {
    const createAlunoDto = {
      nome: 'Pedro Silva',
      endereco: 'Rua do Pedro',
      telefone: '11984756493',
      email: 'pedro@gmail.com',
      anoNascimento: 2001,
    };

    const alunoExistente = {
      id: randomUUID(),
      nome: 'Pedro dos Santos',
      endereco: 'Avenida Flores, nº 201',
      telefone: '75988456354',
      email: 'pedro@gmail.com',
      cursos: [],
    } as Aluno;

    jest.spyOn(repository, 'listarTodos').mockReturnValue([alunoExistente]);

    expect(() => service.create(createAlunoDto)).toThrow(ConflictException);
  });
});
