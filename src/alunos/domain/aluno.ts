import { randomUUID } from 'crypto';

export class Aluno {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  cursos: string[];

  constructor(nome: string, endereco: string, telefone: string, email: string) {
    this.id = randomUUID();
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.cursos = [];
  }
}
