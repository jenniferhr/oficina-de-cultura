Projeto do bootcamp Imersão Javascript com back-end e AWS - Reprograma.

<h2 align=center>Sistema de Gestão das Oficinas de Cultura </h2>

> 💡 As Oficinas Culturais são espaços mantidos pela Secretaria de Cultura do Estado e dedicados à promoção e à formação cultural. Elas oferecem uma variedade de atividades, incluindo cursos, workshops, palestras, exposições, apresentações artísticas, residências artísticas, entre outros. O objetivo principal das Oficinas Culturais é democratizar o acesso à cultura, fomentar o desenvolvimento artístico e cultural das comunidades locais e promover a troca de conhecimento entre artistas, produtores culturais e a população em geral.

Por problemas de gestão a Prefeitura de São Piraporinha do Sul decidiu fechar as Oficinas de Cultura, eles alegavam que tinham um sistema mas que ele estava todo por papel e que seria melhor fechar as Oficinas de Cultura do que criar um sistema digital.
Sabendo disso a comunidade da {Reprograma} decidiu desenvolver o sistema de gestão das aulas das Oficinas de Cultura.

### Serviços que o sistema de gestão das Oficinas de Cultura deseja ter:

- Cadastro de Alunos e Professores: Registro de novos alunos e professores na plataforma.
- Matrícula em Cursos: Inscrição de alunos em cursos oferecidos pelas Oficinas de Cultura.
- Gestão de Cursos: Criação e edição de cursos, com detalhes como título e descrição.
- Registro de Presença: Marcação da presença dos alunos nas aulas dos cursos.

### Instruções de implementação:

- Criar classes separadas para Aluno, Professor e Curso, incluindo os atributos mencionados no diagrama.
- Implementar métodos nas classes para registrar alunos e professores, matricular alunos em cursos, gerenciar cursos e registrar presença.
- Organizar a estrutura do projeto de forma apropriada, seguindo as melhores práticas para uma API RESTful.
- Aplicar a arquitetura Hexagonal
- Aplicar os princípios de design de código, como SOLID, DRY e KISS.
- Implementar padrões de design, como Factory e Observer.
- Escrever testes unitários básicos para garantir a funcionalidade do sistema.

### Diagrama de classes:

```lua
+-------------------+
|       Pessoa      |
+-------------------+
| - id: string      |
| - nome: string    |
| - endereco: string|
| - telefone: string|
+-------------------+
        ^
        |
+-------+-------+
|               |
|    Professor  |
+---------------+
| - disciplinas: string[] |
+---------------+

+-----------------+
|      Aluno      |
+-----------------+
| - cursos: Curso[] |
+-----------------+

+----------------------+
|        Curso         |
+----------------------+
| - id: string         |
| - titulo: string     |
| - descricao: string  |
| - professores: Professor[] |
| - alunos: Aluno[]    |
+----------------------+
```

Exercício 1: Refinamento para entendimento dos requisitos, regras de negócio e casos de uso

Exercício 2: Implementação das classes do nosso domínio

Exercício 3: Definição das rotas que serão expostas pela nossa API

Exercício 4: Codemos!!!
