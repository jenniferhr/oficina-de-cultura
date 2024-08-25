export class Aluno {
  constructor(
    public id: string,
    public nome: string,
    public endereco: string,
    public telefone: string,
    public email: string,
    public cursos: string[],
  ) {}
}
