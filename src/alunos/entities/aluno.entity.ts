export class Aluno {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  cursos: string[];

  constructor(nome: string, endereco: string, telefone: string, email: string) {
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.email = email;
    this.cursos = [];
  }
}
