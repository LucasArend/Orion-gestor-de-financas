Orion — Gerenciador de Finanças Pessoais

📌 Visão Geral

O Orion é uma plataforma moderna para gestão financeira pessoal, criada
para oferecer controle centralizado, simplicidade e acesso em qualquer
dispositivo.
Ele elimina a necessidade de planilhas confusas e aplicativos isolados,
entregando uma experiência limpa, precisa e acessível.

------------------------------------------------------------------------

🎯 Problema que o projeto resolve

Como garantir um controle financeiro eficiente, centralizado e
disponível em qualquer dispositivo, evitando a complexidade de planilhas
e aplicativos isolados?

------------------------------------------------------------------------

📝 Resumo

O Orion é um gerenciador financeiro pessoal que permite:

-   Cadastrar receitas e despesas
-   Categorizar transações
-   Acompanhar gráficos e relatórios
-   Visualizar saldo e tendências
-   Acessar tudo em uma interface moderna, responsiva e intuitiva

Seu objetivo é tornar o controle financeiro simples, prático e
visualmente agradável.

------------------------------------------------------------------------

👥 Público-alvo

-   Jovens adultos iniciando organização financeira
-   Profissionais que desejam acompanhar gastos e ganhos
-   Usuários que querem substituir planilhas manuais por algo moderno e
    online

------------------------------------------------------------------------

🧩 Tecnologias Utilizadas

Frontend

-   React 19
-   React Router
-   TailwindCSS
-   Framer Motion
-   Axios
-   React Query
-   Chart.js / React-chartjs-2
-   Recharts
-   Firebase
-   React Hook Form + Yup
-   Date-fns
-   Lucide-react
-   Headless UI

Backend

-   Spring Boot
-   Spring Security
-   JWT (jjwt)
-   Spring Data JPA
-   PostgreSQL
-   H2 (dev)
-   Springdoc OpenAPI
-   Firebase Admin
-   Dotenv Java
-   Thymeleaf (interno)
-   JDBC

------------------------------------------------------------------------

🗄 Banco de Dados

-   PostgreSQL como banco principal
-   H2 para ambiente de desenvolvimento (opcional)

------------------------------------------------------------------------

🔐 Autenticação

-   Autenticação via JWT
-   Login tradicional ou via Google OAuth2
    -   Necessário configurar chave do Google no application.properties

------------------------------------------------------------------------

🚀 Funcionalidades Principais

👤 Usuários

-   Cadastro via formulário
-   Cadastro/login via Google OAuth2
-   Atualização de dados
-   Atualização de senha

💰 Transações

-   Cadastro de receitas e despesas
-   Categorias personalizadas
-   Status da transação (PENDENTE / CONCLUIDO / CANCELADA)
-   Parcelamento de transações
-   Listagem por usuário
-   Edição e exclusão

📊 Gráficos e Relatórios

-   Gráfico de balanço
-   Gráfico de despesas
-   Gráfico de economia
-   Atualizados automaticamente com base nas transações

🥅 Metas Financeiras

-   Criar metas
-   Definir contribuições mensais
-   Previsão automática da data estimada de conclusão
-   Contribuição automática via rota específica

💵 Economias

-   Criar saldo inicial
-   Gerenciar reserva de emergência

------------------------------------------------------------------------

🗂 Estrutura de Rotas da API

(Resumo — todas estão incluídas no Swagger)

-   /auth/register — Registro
-   /auth/login — Login
-   /auth/login/oauth2/code/google — Login Google
-   /users — Listagem de usuários
-   /users/me — Perfil do usuário logado
-   /categorias — CRUD de categorias
-   /api/transacoes — CRUD de transações
-   /api/transacoes/{id}/status — Atualização de status
-   /goals — CRUD de metas
-   /goals/{id}/contribute — Contribuição para meta
-   /economias/saldo — Saldo
-   /economias/reserva — Reserva

------------------------------------------------------------------------

🛠 Como rodar o projeto

Frontend

    npm install
    npm run dev

Backend

    mvn spring-boot:run

Via Docker Compose (Recomendado)

O projeto inclui um docker-compose.yml que sobe:
- Backend
- Frontend
- Banco PostgreSQL

Rodar com:

    docker compose up

------------------------------------------------------------------------

🛣 Roadmap Futuro

-   📈 Guia de investimentos
-   🔐 Login com mais redes sociais
-   🔄 Lançamentos automáticos (recorrentes)

------------------------------------------------------------------------

📜 Licença

Defina aqui a licença desejada (exemplo: MIT, GPL, Apache).
Atualmente não definida.

------------------------------------------------------------------------

💬 Contribuições

Pull requests são bem-vindos!
Sugestões, melhorias e correções também são incentivadas.

------------------------------------------------------------------------

⭐ Agradecimentos

Obrigado por conhecer o Orion! Seu apoio contribui muito para o
desenvolvimento contínuo do projeto.
