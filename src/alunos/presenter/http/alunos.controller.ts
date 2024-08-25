import { Controller, Post, Body, Get } from '@nestjs/common';
import { AlunosService } from '../../application/alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { CreateAlunoCommand } from '../../application/commands/create-aluno-command';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  cadastrar(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunosService.criar(
      new CreateAlunoCommand(
        createAlunoDto.nome,
        createAlunoDto.endereco,
        createAlunoDto.email,
        createAlunoDto.telefone,
        createAlunoDto.anoNascimento,
      ),
    );
  }

  @Get()
  listar() {
    return this.alunosService.listar();
  }
}
