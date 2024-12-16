<h1 align="center">
  <img alt="project logo" src="https://teddydigital.io/wp-content/uploads/2023/02/Ativo-13-8.png" width="224px"/><br/>
  Teddy Dashboard Backend
</h1>
<p align="center">
    Backend do sistema de gestão de clientes desenvolvido com <b>Nest.js</b>, incluindo <b>autenticação JWT</b>, <b>mensageria com RabbitMQ</b>, <b>observabilidade com Prometheus</b> e <b>documentação Swagger</b>. Parte do teste técnico para Tech Lead da Teddy Open Finance.
    <br/>
    <br/>
    Código <b>escalável</b>, <b>performático</b> e <b>modularizado</b>, com foco em organização, segurança e extensibilidade.
</p>

<hr>

<div align="center">

**[SOBRE O PROJETO](#-sobre-o-projeto) •
[TECH STACK & LIBS](#-tech-stack--libs) •
[COMO INSTALAR](#-como-instalar) •
[UTILIZANDO O SISTEMA](#-utilizando-o-sistema) •
[OUTROS DETALHES TÉCNICOS](#-alguns-outros-detalhes-técnicos) •
[CONSIDERAÇÕES FINAIS](#-considerações-finais) •

</div>
<br />

# ☄ Sobre o Projeto

Este backend foi desenvolvido em **Nest.js** e implementa funcionalidades para um sistema de gestão de clientes. Ele
inclui:

- Autenticação via **JWT** para proteger endpoints e garantir a segurança.
- Integração com **RabbitMQ** para mensageria e registro de logs de operações.
- Observabilidade configurada com **Prometheus** e **Grafana**.
- Estrutura modularizada e organizada seguindo **Clean Architecture**, permitindo fácil escalabilidade e manutenção.

Além disso, o projeto foi pensado para ser flexível e extensível, facilitando a adição de novas funcionalidades no
futuro.

<br />

# 💻 Tech Stack & Libs

Aqui estão as tecnologias e bibliotecas utilizadas neste projeto:

- **[Nest.js](https://nestjs.com/)** - Framework para construção de APIs escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript com tipagem estática.
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional utilizado no sistema.
- **[TypeORM](https://typeorm.io/)** - ORM para gerenciamento e manipulação de dados.
- **[JWT](https://jwt.io/)** - Utilizado para autenticação e autorização.
- **[RabbitMQ](https://www.rabbitmq.com/)** - Sistema de mensageria para registrar logs e eventos.
- **[Prometheus](https://prometheus.io/)** e **[Grafana](https://grafana.com/)** - Ferramentas para observabilidade e
  monitoramento.
- **[Swagger](https://swagger.io/)** - Para geração de documentação interativa da API.
- **[Jest](https://jestjs.io/)** - Para testes unitários e integração.

<br />

# 🚀 Como Instalar

Certifique-se de ter o **Docker** e o **Docker Compose** instalados na sua máquina. Depois, siga os passos abaixo:

### Configurando as Variáveis de Ambiente

1. Navegue até a pasta `backend` e copie o arquivo `.env.example` para `.env`:

```bash
    cd backend
    cp .env.example .env
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
    JWT_SECRET=your_secret_key
    RABBITMQ_URL=amqp://<username>:<password>@<host>:<port>
    PROMETHEUS_PORT=9090
 ```

> 🚨 Atenção: Certifique-se de que o backend pode acessar os serviços configurados na `infra`.

### Rodando com Docker

No diretório `infra`, execute o seguinte comando para buildar e subir os containers:

```bash
    docker compose up --build
```

### Rodando manualmente

Se preferir rodar o backend manualmente, siga os passos abaixo:

1. Instale as dependências do projeto:

```bash
    npm install
```

2. Execute o comando abaixo para rodar o projeto:

```bash
    npm run start:dev
```

3. O backend estará acessível em http://localhost:3001.

<br/>

# ⌨️ Utilizando o Sistema

Com o backend configurado e rodando, você pode acessar e interagir com o sistema:

### Endpoints Disponíveis

1. **Documentação da API**: Acesse http://localhost:3001/api para consultar a documentação interativa gerada pelo
   Swagger.

2. **Autenticação**:
    - Use os endpoints de login e registro para gerar um token JWT.
    - Tokens são necessários para acessar as rotas protegidas via Authorization Header com Bearer Token.

3. **CRUD de Clientes**:
    - Utilize os endpoints de clientes para realizar operações de criar, listar, editar e excluir.

4. **Mensageria**:
    - O backend envia mensagens para o RabbitMQ ao criar, editar ou excluir um cliente. Os consumers só dão log no
      console, mas poderiam fazer qualquer outra coisa.

### Observabilidade e Monitoramento

1. **Prometheus**: Acesse http://localhost:9090 para visualizar métricas detalhadas.
2. **Grafana**: Dashboards configurados estão disponíveis em http://localhost:3002. Login padrão: admin / admin.
3. **RabbitMQ**: Acesse http://localhost:15672 para monitorar filas e mensagens. Login padrão: guest / guest.
    - Você pode reparar no Console que todos eventos que são publicados nas filas do RabbitMQ pelos Producers são
      escutados pelos Consumers. Eu só coloquei console.log mesmo para demonstrar, mas poderíamos consumir isso em outro
      serviço ou então fazer qualquer outra coisa com o poder da arquitetura orientada a eventos e mensagerias.

<br/>

# 📚 Alguns Outros Detalhes Técnicos...

- **Arquitetura Modularizada**:
    - O projeto segue os princípios de Clean Architecture, Domain Driven Design, SOLID, Design Patterns, além de outros
      conceitos de System Design com módulos bem separados para responsabilidade clara e fácil escalabilidade.

- **Segurança**:
    - Todas as rotas protegidas utilizam autenticação JWT.
    - Senhas são armazenadas de forma segura utilizando bcrypt.

- **Mensageria**:
    - O **RabbitMQ** é utilizado para registrar eventos e logs de operações realizadas no sistema.


- Observabilidade:
    - **Prometheus** e **Grafana** são utilizados para monitorar métricas e visualizar dashboards personalizados.

- Testes Automatizados:
    - Testes unitários e de integração cobrem as principais funcionalidades do sistema, garantindo estabilidade e
      confiabilidade.
    - Foram usados diversos padrões de testes, como mocks, spies, Triple A, SUTs, MUts, Test Pyramid na hora de
      arquitetar...

<br />

# 👋 Considerações Finais

Este backend foi desenvolvido com muita atenção aos detalhes, incorporando boas práticas de desenvolvimento e
organização. Ele está preparado para atender aos requisitos do sistema e crescer com facilidade.

Se houver dúvidas ou sugestões, estou às ordens.
