# TODO

- [ ] *Completar o Sistema de Notificações*
  - [ ] Garantir que as notificações automáticas via WhatsApp sejam enviadas para todos os tipos de eventos (frequência, notas, atividades).
  - [ ] Implementar um mecanismo de reenvio para notificações que falharem utilizando a API do WPPConnect.
  - [ ] Adicionar a possibilidade de os pais optarem por receber ou não as notificações.

- [ ] *Portal de Alunos e Pais*
  - [ ] Finalizar as funcionalidades restantes do painel dos pais (acesso a atividades, notas, frequência).
  - [ ] Implementar busca e filtros para alunos, professores e turmas.
  - [ ] Adicionar paginação em tabelas grandes para melhorar o desempenho.

- [ ] *Gestão de Usuários*
  - [ ] Finalizar a implementação do painel de administração para gestão de usuários.
  - [ ] Adicionar controle de acesso baseado em funções (RBAC) para administradores, professores e pais.
  - [ ] Criar um sistema de convites para que administradores possam convidar novos professores e coordenadores por e-mail.

- [ ] *Acompanhamento de Tarefas e Atividades*
  - [ ] Completar o recurso de acompanhamento de envio de tarefas.
  - [ ] Adicionar notificações para os professores sobre tarefas atrasadas.

- [ ] *Sistema de Boletim*
  - [ ] Finalizar a funcionalidade de boletim, permitindo que professores insiram e modifiquem notas.
  - [ ] Permitir que alunos/pais vejam o detalhamento das notas no portal.

- [ ] *Análise de Desempenho dos Alunos*
  - [ ] Implementar recursos que permitam a análise do desempenho dos alunos ao longo do tempo.
  - [ ] Visualizar as tendências de desempenho no painel usando gráficos (ex.: notas, frequência).

- [ ] *Insights de Dados da Sala de Aula*
  - [ ] Analisar dados a nível de turma para fornecer insights aos professores (ex.: desempenho médio, áreas de melhoria).

- [ ] *Métricas de Engajamento dos Pais*
  - [ ] Fornecer dados sobre o engajamento dos pais com o sistema (ex.: taxa de resposta às mensagens, frequência de login).

- [ ] *Melhorias Gerais de Código*
  - [ ] Modularizar a base de código em módulos menores e mais gerenciáveis, separando lógica de negócios, camadas de acesso a dados e interações de API.
  - [ ] Adicionar comentários e melhorar a documentação do código, garantindo que cada função e módulo estejam bem documentados.
  - [ ] Aplicar o princípio DRY para eliminar código duplicado e centralizar lógica comum em funções utilitárias ou serviços.

- [ ] *Backend*
  - [ ] Implementar sistema de transações no banco de dados para manter a integridade dos dados em operações críticas.
  - [ ] Adicionar limitação de taxa (rate-limiting) em APIs críticas para evitar abusos.
  - [ ] Utilizar jobs em background para tarefas longas, como envio de notificações e análise de dados, com uma fila de processamento como Bull para Node.js.

- [ ] *Sistema de Notificações*
  - [ ] Expandir o sistema de notificações para suportar canais como e-mail, SMS e notificações push, além do WhatsApp.
  - [ ] Adicionar logs detalhados de notificações que falharem, permitindo análise e correção posterior.

- [ ] *Refatoração da API*
  - [ ] Implementar limitação de taxa (rate-limiting) nos endpoints da API.
  - [ ] Implementar versionamento na API para possibilitar futuras atualizações sem quebrar a compatibilidade.
  - [ ] Introduzir caching para dados acessados com frequência, como listas de alunos e perfis de usuários.

- [ ] *Frontend*
  - [ ] Assegurar que o aplicativo seja totalmente acessível (A11y), adicionando navegação por teclado, tags para leitores de tela (ARIA), e contraste adequado.
  - [ ] Implementar centralização de estado com Vuex ou Pinia para reduzir a propagação excessiva de props.
  - [ ] Utilizar lazy-loading para imagens e componentes de grande volume de dados para otimizar o tempo de carregamento.
  - [ ] Otimizar animações e transições, utilizando-as com moderação para evitar degradação da performance em dispositivos de menor capacidade.

- [ ] *Testes*
  - [ ] Implementar testes no estilo BDD (Behavior-Driven Development) usando Cucumber.js para validar comportamentos esperados.
  - [ ] Realizar testes de carga e estresse com ferramentas como Locust ou k6, especialmente após a migração para PostgreSQL.

- [ ] *Banco de Dados*
  - [ ] Adicionar constraints e triggers no banco de dados para garantir integridade de dados, especialmente em registros de desempenho e notificações.
  - [ ] Implementar partição de tabelas grandes para melhorar a performance em consultas no PostgreSQL.

- [ ] *Melhorias na UI/UX*
  - [ ] Criar páginas de erro personalizadas (404, 500, etc.) para melhorar a experiência do usuário.
  - [ ] Aplicar uma abordagem mobile-first para melhorar a responsividade em dispositivos móveis.
  - [ ] Utilizar websockets para atualizar dashboards e notificações em tempo real sem recarregar a página.

- [ ] *Segurança*
  - [ ] Implementar autenticação segura utilizando OAuth2 ou JWT com gerenciamento de tokens de refresh.
  - [ ] Minimizar dados sensíveis nas respostas de API, criptografando ou ocultando informações confidenciais.
  - [ ] Implementar uma política de segurança de conteúdo (CSP) para mitigar ataques XSS e outras vulnerabilidades.

- [ ] *Monitoramento e Manutenção*
  - [ ] Adicionar monitoramento de saúde do sistema com ferramentas como Prometheus ou Datadog para identificar problemas em tempo real.
  - [ ] Configurar backups automáticos para o PostgreSQL com política de retenção de dados.
  - [ ] Implementar endpoints de verificação de saúde no backend para garantir disponibilidade da aplicação.

## Backend

- [ ] *Migrar para PostgreSQL*
  - [ ] Mudar de SQLite para PostgreSQL para melhor escalabilidade e integridade dos dados.
  - [ ] Atualizar o esquema Prisma para refletir os tipos de dados e otimizações específicas do PostgreSQL.
  - [ ] Migrar os dados existentes de SQLite para PostgreSQL.

- [ ] *Otimização de Consultas PostgreSQL*
  - [ ] Garantir que índices sejam criados em campos consultados frequentemente, como email, id, e turmaId.
  - [ ] Utilizar EXPLAIN ANALYZE no PostgreSQL para verificar se as consultas estão otimizadas, especialmente consultas complexas com joins.

- [ ] *API Improvements*
  - [ ] Refatorar os endpoints da API para reduzir código redundante movendo lógica comum para uma camada de serviços.
  - [ ] Implementar validação de entrada em todas as rotas da API usando zod ou yup.

- [ ] *Database Migrations*
  - [ ] Adicionar as migrações necessárias para todas as funcionalidades planejadas (ex.: novos modelos como notificações, frequência).
  - [ ] Usar seed no banco de dados para fornecer dados iniciais para ambientes de teste.

- [ ] *Global Error Handler*
  - [ ] Implementar um manipulador global de erros na API para capturar e gerenciar erros inesperados em todas as rotas. Isso garantirá respostas consistentes e facilitará a depuração.

- [ ] *Detailed Error Logs*
  - [ ] Configurar logs detalhados tanto para erros no frontend quanto no backend. Ferramentas como Sentry ou logs personalizados podem ajudar a rastrear problemas em produção.

## Frontend

- [ ] *Melhorias na UI/UX*
  - [ ] Garantir que todos os formulários tenham validação e tratamento de erros consistentes.
  - [ ] Melhorar a responsividade em dispositivos móveis, especialmente em telas menores.
  - [ ] Adicionar estados de carregamento para botões que disparam ações assíncronas (ex.: salvar formulários).
  - [ ] Adicionar indicadores de carregamento ou feedback para ações que levem mais de alguns segundos.

- [ ] *Paginação e Cache*
  - [ ] Implementar paginação para conjuntos de dados grandes (ex.: alunos, professores, notas) tanto no backend quanto no frontend.
  - [ ] Usar cache no lado do cliente (ex.: Suspense do Vue ou mecanismos de cache do Apollo) para evitar chamadas desnecessárias à API para dados frequentemente acessados.

- [ ] *Validação de Props nos Componentes Vue*
  - [ ] Adicionar validação de props em componentes Vue para garantir que cada componente receba os dados no tipo e formato corretos.

- [ ] *Reuso de Componentes*
  - [ ] Refatorar elementos repetitivos como modais e tabelas em componentes reutilizáveis.
  - [ ] Garantir a consistência visual usando configurações personalizadas do TailwindCSS.

- [ ] *Dynamic Component Loading*
  - [ ] Garantir que componentes que não são visíveis imediatamente sejam carregados sob demanda (lazy loading) para reduzir o tempo de carregamento inicial.

## Desempenho e Otimização

- [ ] *Code Splitting*
  - [ ] Utilizar carregamento dinâmico nas rotas do Vue Router para garantir que apenas o código necessário para cada rota seja carregado.
  - [ ] Garantir que o tree shaking remova código não utilizado durante o build para reduzir o tamanho dos bundles.

- [ ] *PostgreSQL Query Optimization*
  - [ ] Bater consultas onde múltiplas entidades relacionadas são recuperadas para otimizar o tempo de resposta.
  - [ ] Assegurar que as migrações de banco de dados incluam todos os índices necessários e constraints para manter a integridade dos dados.

- [ ] *CSS Optimization*
  - [ ] Garantir que o CSS não utilizado seja removido na build de produção utilizando a função purge do TailwindCSS.

- [ ] *Pré-carregamento de Recursos*
  - [ ] Garantir que recursos críticos (CSS, JavaScript) sejam pré-carregados para tempos de carregamento mais rápidos.

## Segurança

- [ ] *Validação de Entrada*
  - [ ] Fortalecer a validação de entradas tanto no backend quanto no frontend com zod ou yup.

- [ ] *Manipulação de Dados Sensíveis*
  - [ ] Assegurar que dados sensíveis como senhas e informações de contato sejam criptografados ou com hash (ex.: usando bcrypt).

## Testes e Qualidade

- [ ] *Testes Unitários*
  - [ ] Escrever testes unitários para componentes e composables principais.
  - [ ] Adicionar testes unitários para rotas da API usando um framework de testes como o Jest.

- [ ] *Testes End-to-End*
  - [ ] Configurar testes end-to-end usando Cypress para verificar os principais fluxos (ex.: login, envio de notificações).

- [ ] *Linting e Formatação*
  - [ ] Garantir que o ESLint esteja configurado para detectar todos os erros potenciais.
  - [ ] Configurar o Prettier para garantir formatação consistente do código.

## SEO e Otimização de Desempenho

- [ ] *Tags Meta e SEO*
  - [ ] Garantir que as tags meta dinâmicas e as tags Open Graph e Twitter Card estejam configuradas corretamente.

## Estilos e UI

- [ ] *Consolidação de Classes do Tailwind*
  - [ ] Reduzir o número de classes utilitárias, consolidando-as em componentes reutilizáveis ou utilizando @apply no TailwindCSS para padrões mais complexos.

- [ ] *Consistência de Temas*
  - [ ] Garantir que os temas claro e escuro sejam consistentes e que a troca entre eles seja suave.

## Gestão de Estado

- [ ] *Centralized State Management*
  - [ ] Considerar a implementação de uma store (ex.: Vuex ou Pinia) para gerenciar estados compartilhados como sessões de usuário, notificações e configurações da aplicação.

## Hospedagem e Implantação

- [ ] *Hospedagem no Vercel*
  - [ ] Preparar a aplicação para implantação no Vercel.
  - [ ] Configurar variáveis de ambiente no Vercel para PostgreSQL e chaves da API.
  - [ ] Implementar funções serverless onde necessário para integração com a infraestrutura do Vercel.

## Documentação

- [ ] *Documentação da API*
  - [ ] Gerar documentação da API usando Swagger ou ferramentas similares para todos os endpoints disponíveis.

- [ ] *Documentação para Desenvolvedores*
  - [ ] Documentar as etapas de configuração para futuros colaboradores (ex.: desenvolvimento local, implantação).

- [ ] *Documentação para Usuários*
  - [ ] Criar documentação para professores, coordenadores e pais sobre como usar o sistema.