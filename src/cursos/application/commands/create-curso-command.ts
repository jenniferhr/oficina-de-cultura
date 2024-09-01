// TODO: criar domain Professor.ts
export class CreateCursoCommand {
  constructor(
    public readonly titulo: string,
    public readonly descricao: string,
  ) {}
}
