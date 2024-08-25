import { Test, TestingModule } from '@nestjs/testing';
import { AlunosService } from './alunos.service';
import { randomUUID } from 'crypto';
import { ConflictException } from '@nestjs/common';
import { Aluno } from '../domain/aluno';
import { AlunosRepository } from './ports/alunos.repository';

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
            buscarPorEmail: jest.fn(),
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

  it('deve criar um novo aluno quando o email passado não existe', () => {
    const createAlunoDto = {
      nome: 'Pedro Silva',
      endereco: 'Rua do Pedro',
      telefone: '11984756493',
      email: 'pedro@gmail.com',
      anoNascimento: 2001,
    };

    const alunoNovoSalvo = {
      id: randomUUID(),
      nome: createAlunoDto.nome,
      endereco: createAlunoDto.endereco,
      telefone: createAlunoDto.telefone,
      email: createAlunoDto.email,
      cursos: [],
    } as any as Promise<Aluno>;

    jest.spyOn(repository, 'buscarPorEmail').mockReturnValue(undefined);
    jest.spyOn(repository, 'salvar').mockReturnValue(alunoNovoSalvo);

    let resposta;

    try {
      resposta = service.criar(createAlunoDto);
    } catch (e) {
      throw e;
    }

    expect(resposta).toEqual(alunoNovoSalvo);
    expect(repository.buscarPorEmail).toHaveBeenCalled();
    expect(repository.salvar).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: createAlunoDto.nome,
        endereco: createAlunoDto.endereco,
        telefone: createAlunoDto.telefone,
        email: createAlunoDto.email,
      }),
    );
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
    } as any as Promise<Aluno>;

    jest.spyOn(repository, 'buscarPorEmail').mockReturnValue(alunoExistente);

    expect(() => service.criar(createAlunoDto)).toThrow(ConflictException);
    expect(repository.buscarPorEmail).toHaveBeenCalled();
  });
});
