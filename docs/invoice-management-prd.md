# Kigolasso - PRD (Product Requirements Document) v2.0

**Versão**: 2.0 (Outubro 2025) - Corrigida para uso com Taskmaster  
**Status**: ✅ Aprovado para Decomposição  
**Última Atualização**: 03/10/2025

---

## 📌 Resumo Executivo

- **Objetivo Principal**: Resolver a desorganização na gestão de peladas amadoras através de uma plataforma que centraliza agendamento, confirmação, pagamento e conexão com quadras.

- **Problema Resolvido**: Jogadores amadores enfrentam dificuldades para organizar jogos usando WhatsApp (listas manuais, confirmações perdidas, calotes). Quadras perdem oportunidades por falta de visibilidade.

- **Usuários-Alvo**:

  - **Primário**: Organizadores (Admins) e jogadores amadores (+18 anos)
  - **Secundário**: Donos de quadras de futebol

- **Valor de Negócio**:

  - Receita recorrente via assinatura (R$ 50/mês por time + R$ 50/mês por quadra)
  - Redução de 80% em calotes através de pagamento antecipado
  - Aumento de 50% na ocupação de quadras parceiras

- **Diferencial vs. Chega+**: Pagamento integrado via Stripe + Conexão com quadras + Sistema robusto de gestão de times

---

## 🎯 Contexto e Justificativa

### Problema Identificado

**Via WhatsApp (cenário atual):**

- Listas manuais copiadas/reenviadas dezenas de vezes
- Confirmações perdidas em conversas
- Zero controle de pagamentos
- Times desbalanceados
- Admin fica no prejuízo com calotes

**Via Chega+ (concorrente):**

- Confirmação digital existe, mas sem integração com pagamento
- Sem conexão com quadras
- Sem avaliação de jogadores para balanceamento

**Para Quadras:**

- Dependem de ligações/WhatsApp
- 40% dos horários ociosos durante semana
- Calotes em reservas por telefone

### Oportunidade

- **Mercado**: Milhões de brasileiros jogam futebol amador semanalmente
- **MVP validado**: Já há interessados antes do lançamento
- **Concorrência limitada**: Chega+ não resolve pagamento nem quadras
- **Timing**: Digitalização pós-pandemia

### Objetivos de Negócio (12 meses)

1. **Adoção**: 1.000 times ativos (R$ 50k MRR)
2. **Engajamento**: Taxa de no-show < 5% (vs. 30% atual)
3. **Qualidade**: NPS acima de 70
4. **Quadras**: 100 parceiros integrados

---

## 👥 Usuários e Personas

### Persona 1: Marcelo - O Admin Organizador

- **Perfil**: 32 anos, TI, organiza pelada há 5 anos
- **Dores**: Já ficou no prejuízo 3x por calote, perde 2h/semana organizando
- **Objetivo**: "Organizar em 10min e garantir que ninguém me deixe na mão"

### Persona 2: Pedro - O Jogador Casual

- **Perfil**: 28 anos, joga quando pode, 2-3 grupos
- **Dores**: Perde mensagens no WhatsApp, esquece de confirmar
- **Objetivo**: "Confirmar em 2 cliques e garantir minha vaga"

### Persona 3: Carla - Dona da Quadra

- **Perfil**: 45 anos, administra quadra há 10 anos
- **Dores**: 40% dos horários vazios, calotes, planilhas manuais
- **Objetivo**: "Agenda sempre cheia e pagamento garantido"

---

## ❌ Exclusões de Escopo

### Funcionalidades NÃO Incluídas (Todas as Fases)

**Social e Comunicação:**

- ❌ Chat/mensagens entre jogadores (usar WhatsApp externo)
- ❌ Feed social tipo Instagram/Facebook
- ❌ Stories ou posts de jogos
- ❌ Integração com Facebook/Instagram para login
- ❌ Compartilhamento automático de resultados em redes sociais

**Conteúdo e Mídia:**

- ❌ Transmissão ao vivo de jogos
- ❌ Upload de vídeos de jogos
- ❌ Highlights automáticos com IA
- ❌ Biblioteca de táticas/treinos

**Marketplace e E-commerce:**

- ❌ Venda de equipamentos (chuteiras, bolas)
- ❌ Marketplace de serviços (árbitros, fotógrafos)
- ❌ Sistema de cupons/descontos de parceiros

**Gestão Avançada:**

- ❌ Sistema de arbitragem/denúncias entre jogadores
- ❌ Contratação de árbitros pelo app
- ❌ Gestão de patrocínios formais (contratos, notas fiscais)
- ❌ CRM para quadras

**Gamificação Avançada:**

- ❌ Sistema de ligas/divisões (apenas campeonatos em Fase 3)
- ❌ NFTs ou tokens de recompensa
- ❌ Apostas ou fantasy league

### Limitações Técnicas (Fase 1-2)

**Plataformas:**

- ❌ Aplicação web (apenas mobile nativo iOS/Android)
- ❌ App desktop (Windows/Mac)
- ❌ Progressive Web App (PWA)

**Integrações:**

- ❌ Integração com calendário (Google/Apple Calendar)
- ❌ API pública para desenvolvedores terceiros
- ❌ White-label para quadras personalizarem app
- ❌ Integração com ERP de quadras

**Funcionalidades de Backend:**

- ❌ Machine learning para prever no-shows
- ❌ Recomendação de jogadores via IA
- ❌ Análise preditiva de horários ideais

### Compliance e Financeiro

- ❌ Suporte a menores de 18 anos (Fase 1-3)
- ❌ Emissão automática de notas fiscais
- ❌ Split de pagamento com múltiplos beneficiários
- ❌ Carteira digital interna (dinheiro fica apenas no Stripe)

---

## 🛠️ Tech Stack Definido

### Mobile (Front-end)

**Framework**: React Native 0.74+  
**Linguagem**: TypeScript  
**Gerenciamento de Estado**: Zustand + Immer  
**Navegação**: React Navigation 6  
**UI Library**: React Native Paper (Material Design)  
**Formulários**: React Hook Form + Zod  
**Notificações Push**: Firebase Cloud Messaging (FCM)

**Justificativa**:

- Time JavaScript (consistência backend-frontend)
- Comunidade ativa + bibliotecas maduras
- Stripe SDK oficial suporta React Native
- Desenvolvimento simultâneo iOS/Android

---

### Backend

**Framework**: Node.js 20 LTS + Express 4.18  
**Linguagem**: TypeScript  
**ORM**: Prisma 5+ (type-safe, migrações automáticas)  
**Validação**: Zod (shared com frontend)  
**Autenticação**: JWT (jsonwebtoken) + Refresh Tokens  
**Rate Limiting**: express-rate-limit  
**Logs**: Winston + Sentry

**Justificativa**:

- Alinhamento com stack mobile (TypeScript)
- Webhooks Stripe funcionam perfeitamente com Node.js
- Prisma facilita modelagem e migrações

---

### Banco de Dados

**SGBD Principal**: PostgreSQL 16  
**Cache**: Redis 7+ (sessões, perfis, avaliações)  
**Storage de Arquivos**: AWS S3 (fotos de perfil, logos, fotos de quadras)

**Justificativa**:

- PostgreSQL: ACID crítico para transações financeiras
- Redis: Performance em leituras frequentes (avaliações, perfis)
- S3: Escalável e custo-efetivo para imagens

---

### Infraestrutura e DevOps

**Cloud Provider**: AWS  
**Compute**: ECS (Elastic Container Service) + Fargate  
**Load Balancer**: Application Load Balancer (ALB)  
**Banco Gerenciado**: RDS PostgreSQL Multi-AZ  
**Cache**: ElastiCache Redis  
**CDN**: CloudFront (assets estáticos, imagens)  
**Filas**: SQS (notificações, emails)  
**Logs/Monitoramento**: CloudWatch + Sentry  
**CI/CD**: GitHub Actions  
**Containers**: Docker  
**IaC**: Terraform (opcional Fase 2)

**Justificativa**:

- ECS Fargate: Serverless, escala automática, sem gerenciar VMs
- RDS Multi-AZ: Alta disponibilidade para produção
- SQS: Processamento assíncrono confiável

---

### Pagamentos

**Provider**: Stripe  
**Produtos Usados**:

- Stripe Connect (onboarding de Admins e Quadras)
- Payment Links (checkout sem armazenar dados de cartão)
- Webhooks (confirmação de pagamentos)
- Subscriptions (assinaturas mensais)

---

### Outros Serviços

**Notificações Push**: Firebase Cloud Messaging  
**Email Transacional**: SendGrid  
**Geolocalização**: Google Maps Platform (Places API, Geocoding API)  
**SMS (Fallback)**: Twilio (apenas notificações críticas)

---

## 🔧 Funcionalidades e Requisitos

### Epic 1: Gestão de Times e Perfis

---

#### RF001 - Cadastro de Time

**Épico**: Gestão de Times  
**Prioridade**: 🔴 Alta  
**Estimativa**: 6-8h  
**Dependências**: Nenhuma  
**Paralelizável**: Sim

**História do Usuário**:  
Como Admin, eu quero criar um time para começar a organizar meus jogos.

**Critérios de Aceitação**:

- [ ] Admin pode criar múltiplos times
- [ ] Campos obrigatórios: Nome, Esporte (futsal/society/campo), Cidade
- [ ] Campos opcionais: Logo (upload), Cores, Descrição
- [ ] Upload de logo: máx 5MB, formatos jpg/png, redimensionado para 512x512px
- [ ] Nome do time único por usuário (não pode criar 2 times com mesmo nome)
- [ ] Sistema gera slug único: `kigolasso.app/times/{slug}`

**Definition of Done**:

- Testes unitários de validação de campos
- Upload de logo funcional com preview
- Time criado aparece na lista do usuário

---

#### RF002 - Tipos de Perfil no Time

**Épico**: Gestão de Times  
**Prioridade**: 🔴 Alta  
**Estimativa**: 4-6h  
**Dependências**: RF001  
**Paralelizável**: Não

**História do Usuário**:  
Como Admin, eu quero definir diferentes perfis para membros do time para organizar responsabilidades.

**Perfis Suportados**:

1. **Admin**: Controle total (criar jogos, sortear, gerenciar pagamentos)
2. **Técnico**: Visualizar avaliações, sugerir formações
3. **Empresário**: Gerenciar finanças, relatórios
4. **Patrocinador**: Visualizar métricas de visibilidade
5. **Amigo**: Ver calendário, voluntariar-se para tarefas
6. **Jogador**: Confirmar presença, ver própria avaliação

**Critérios de Aceitação**:

- [ ] Admin pode convidar membros via link ou busca de usuário
- [ ] Admin define perfil no momento do convite
- [ ] Admin pode alterar perfil de um membro existente
- [ ] Admin pode remover membros (exceto a si mesmo se for único Admin)
- [ ] Ao remover jogador, sistema pergunta se quer manter histórico de avaliações (anônimo)

**Matriz RBAC**: Ver seção dedicada abaixo

---

#### RF003 - Convite de Membros

**Épico**: Gestão de Times  
**Prioridade**: 🟡 Média  
**Estimativa**: 4-6h  
**Dependências**: RF002  
**Paralelizável**: Parcial (UI pode ser feita enquanto RF002 em QA)

**História do Usuário**:  
Como Admin, eu quero convidar pessoas para meu time de forma fácil.

**Critérios de Aceitação**:

- [ ] Admin gera link de convite com validade de 7 dias (configurável)
- [ ] Link compartilhável via WhatsApp, email, cópia direta
- [ ] Convidado acessa link → vê nome do time e quem convidou → aceita/recusa
- [ ] Se convidado não tem conta, pode criar na hora (flow simplificado)
- [ ] Admin vê lista de convites: pendentes (amarelo), aceitos (verde), recusados (vermelho), expirados (cinza)
- [ ] Admin pode reenviar convite expirado (gera novo link)
- [ ] Admin pode cancelar convite pendente

**Definition of Done**:

- Link funcional com expiração automática
- Notificação push quando convite é aceito/recusado
- Testes E2E do fluxo completo

---

### Epic 2: Autenticação e Onboarding

---

#### RF004 - Cadastro de Usuário (+18 anos)

**Épico**: Autenticação  
**Prioridade**: 🔴 Alta  
**Estimativa**: 8-10h  
**Dependências**: Nenhuma  
**Paralelizável**: Sim

**História do Usuário**:  
Como novo usuário, eu quero me cadastrar rapidamente e com segurança.

**Critérios de Aceitação**:

- [ ] Campos obrigatórios: Nome, Email, CPF, Telefone, Data de Nascimento, Senha
- [ ] Validação de CPF: formato válido + verificação de dígitos via algoritmo
- [ ] Validação de idade: calcular idade a partir de data de nascimento, bloquear se < 18 anos
- [ ] Senha: mínimo 8 caracteres, 1 maiúscula, 1 número, 1 caractere especial
- [ ] Email: validação de formato + envio de email de confirmação (link expira em 24h)
- [ ] Telefone: formato brasileiro (11) 9xxxx-xxxx, usado para SMS emergenciais
- [ ] Checkbox de aceite de Termos de Uso e Política de Privacidade (não pode estar pré-marcado)
- [ ] Se usuário < 18, exibir mensagem: "Kigolasso é exclusivo para maiores de 18 anos. Aguarde o lançamento da versão juvenil!"

**Segurança**:

- Senha armazenada com bcrypt (salt rounds: 12)
- CPF criptografado em repouso (AES-256)
- Rate limiting: máx 5 tentativas de cadastro por IP por hora

**Definition of Done**:

- Usuário recebe email de boas-vindas
- JWT gerado após confirmação de email
- Testes de validação de todos os campos

---

#### RF005 - Login e Autenticação JWT

**Épico**: Autenticação  
**Prioridade**: 🔴 Alta  
**Estimativa**: 6-8h  
**Dependências**: RF004  
**Paralelizável**: Não

**História do Usuário**:  
Como usuário cadastrado, eu quero fazer login de forma segura e permanecer logado.

**Critérios de Aceitação**:

- [ ] Login via Email + Senha ou CPF + Senha
- [ ] Geração de Access Token JWT (expira em 24h)
- [ ] Geração de Refresh Token (expira em 30 dias, rotacionado a cada uso)
- [ ] Checkbox "Lembrar-me" (salva refresh token no secure storage)
- [ ] Após 3 tentativas de login falhas, usuário bloqueado por 15min (rate limiting)
- [ ] Recuperação de senha via email (link expira em 1h)
- [ ] Logout: invalida refresh token no backend

**Segurança**:

- JWT contém: user_id, email, roles (não contém dados sensíveis como CPF)
- Refresh token armazenado com hash (bcrypt) no banco
- HTTPS obrigatório (TLS 1.3)

**Definition of Done**:

- Login funcional iOS e Android
- Fluxo de recuperação de senha testado
- Testes de segurança (tentativas excessivas bloqueadas)

---

### Epic 3: Criação e Gestão de Jogos (Fase 1 - MVP)

---

#### RF006 - Criação de Jogo Básico

**Épico**: Gestão de Jogos  
**Prioridade**: 🔴 Alta  
**Estimativa**: 8-10h  
**Dependências**: RF001 (Time criado), RF005 (Autenticado)  
**Paralelizável**: Não

**História do Usuário**:  
Como Admin, eu quero criar um jogo rapidamente para meus jogadores confirmarem.

**Critérios de Aceitação**:

- [ ] Admin seleciona time da lista (se tiver múltiplos)
- [ ] Campos obrigatórios:
  - Data e horário (não pode ser passado)
  - Local (endereço manual por enquanto - quadras vêm em Fase 2)
  - Número de vagas (10, 12, 14, 16, 18, 20, 22)
  - Valor por jogador (R$)
- [ ] Campos opcionais:
  - Prazo limite para confirmação (padrão: 2h antes do jogo)
  - Observações (ex: "Levar camisa verde")
- [ ] Configuração: Exigir pagamento antecipado? (Sim/Não - padrão: Não)
- [ ] Sistema gera número único do jogo: `{time_slug}-{YYYYMMDD}-{sequencial}`
- [ ] Ao criar, envia notificação push para todos jogadores do time
- [ ] Jogo fica com status "Aguardando Confirmações"

**Definition of Done**:

- Jogo criado aparece na lista de jogos do time
- Notificações enviadas para todos jogadores
- Testes de validação de campos obrigatórios

---

#### RF007 - Confirmação de Presença

**Épico**: Gestão de Jogos  
**Prioridade**: 🔴 Alta  
**Estimativa**: 6-8h  
**Dependências**: RF006  
**Paralelizável**: Não

**História do Usuário**:  
Como Jogador, eu quero confirmar minha presença rapidamente e garantir minha vaga.

**Critérios de Aceitação**:

- [ ] Jogador vê lista de próximos jogos do(s) seu(s) time(s)
- [ ] Card de jogo mostra: data, horário, local, vagas disponíveis (X/Y), valor
- [ ] Botão "Confirmar Presença" em destaque
- [ ] Ao confirmar:
  - Status muda para "Confirmado" (verde)
  - Contador de vagas atualiza em tempo real
  - Admin recebe notificação
- [ ] Jogador pode cancelar confirmação até X horas antes (configurável no jogo)
- [ ] Lista de confirmados visível para todos do time
- [ ] Se vagas esgotarem, botão muda para "Entrar na Fila" (ver RF008)

**Cenário - Pagamento Obrigatório**:

- Se jogo exige pagamento antecipado:
  - Botão muda para "Confirmar e Pagar"
  - Redireciona para checkout Stripe (ver RF010)
  - Confirmação só é efetiva após pagamento aprovado

**Definition of Done**:

- Confirmação reflete em tempo real para todos usuários
- Notificação para Admin funcional
- Testes E2E de confirmação e cancelamento

---

#### RF008 - Sistema de Fila de Espera

**Épico**: Gestão de Jogos  
**Prioridade**: 🟡 Média  
**Estimativa**: 6-8h  
**Dependências**: RF007  
**Paralelizável**: Não

**História do Usuário**:  
Como Jogador, eu quero entrar na fila se o jogo estiver lotado, para garantir vaga se alguém cancelar.

**Critérios de Aceitação**:

- [ ] Quando vagas esgotam, botão muda para "Entrar na Fila"
- [ ] Jogador entra na fila e vê sua posição (ex: "Você é o 3º da fila")
- [ ] Lista de fila visível para Admin e jogadores confirmados
- [ ] Se alguém cancelar:
  - Próximo da fila recebe notificação push imediata
  - Notificação diz: "Uma vaga foi liberada! Você tem 30min para confirmar"
  - Jogador tem 30min para confirmar (timer visível no app)
  - Se não confirmar, vaga passa para próximo da fila
- [ ] Se jogador da fila não quiser mais, pode sair da fila manualmente

**Cenário - Pagamento Obrigatório**:

- Jogador da fila que recebe vaga tem 30min para confirmar E pagar
- Se pagamento falhar, vaga passa para próximo

**Definition of Done**:

- Fila funciona com múltiplos jogadores
- Timer de 30min preciso
- Notificações disparadas corretamente

---

### Epic 4: Pagamento via Stripe (Fase 1 - MVP)

---

#### RF009 - Onboarding Stripe Connect do Admin

**Épico**: Pagamentos  
**Prioridade**: 🔴 Alta  
**Estimativa**: 12-16h (complexo!)  
**Dependências**: RF005 (Autenticado), RF001 (Time criado)  
**Paralelizável**: Sim (UI pode começar antes de integração completa)  
**Risco**: 🔴 Alto (integrações financeiras são críticas)

**História do Usuário**:  
Como Admin, eu preciso configurar minha conta bancária para receber pagamentos dos jogadores.

**Critérios de Aceitação**:

- [ ] Onboarding obrigatório na primeira vez que Admin cria jogo com "Pagamento Obrigatório"
- [ ] Fluxo integrado via Stripe Connect (tipo: Standard ou Express Account)
- [ ] Admin fornece dados conforme exigências Stripe:
  - Dados pessoais (nome, CPF, data de nascimento)
  - Dados bancários (banco, agência, conta)
  - Comprovante de endereço (upload)
- [ ] Verificação de identidade automática via Stripe (análise de documentos)
- [ ] Status da conta visível no perfil do Admin:
  - ⏳ Pendente Verificação (amarelo)
  - ✅ Ativa (verde)
  - 🔴 Bloqueada/Rejeitada (vermelho - com motivo)
- [ ] Se conta rejeitada, Admin pode reenviar documentos
- [ ] Admin pode editar dados bancários a qualquer momento

**Segurança**:

- Dados bancários NÃO são armazenados no Kigolasso (apenas no Stripe)
- Comunicação via HTTPS + OAuth2 (Stripe Connect)

**Cenário de Erro**:

```gherkin
Given Admin tenta criar conta Stripe
When Stripe rejeita por "documento ilegível"
Then sistema exibe: "Documento não foi aceito. Por favor, envie foto mais nítida"
And Admin pode tentar novamente
And jogo criado fica em modo "Pagamento Manual" até conta aprovada
```

**Definition of Done**:

- Fluxo completo testado em Stripe Sandbox
- Webhooks de status de conta configurados
- Erro de verificação tratado com mensagem clara
- Testes de integração com Stripe Connect

---

#### RF010 - Pagamento do Jogador via Stripe

**Épico**: Pagamentos  
**Prioridade**: 🔴 Alta  
**Estimativa**: 10-12h  
**Dependências**: RF009, RF007  
**Paralelizável**: Não  
**Risco**: 🔴 Alto

**História do Usuário**:  
Como Jogador, eu quero pagar minha parte do jogo de forma rápida e segura.

**Critérios de Aceitação**:

- [ ] Ao confirmar presença (se pagamento obrigatório), redireciona para Stripe Payment Link
- [ ] Payment Link gerado dinamicamente com:
  - Valor do jogo (por jogador)
  - Descrição: "Jogo {time} - {data} às {hora}"
  - Conectado à conta Stripe do Admin (via Connect)
- [ ] Jogador paga via:
  - **Pix** (QR Code gerado pelo Stripe, confirmação em até 30s)
  - **Cartão de crédito** (processado pelo Stripe)
  - **Boleto** (opcional, se Stripe ativar no BR)
- [ ] Após pagamento aprovado:
  - Webhook Stripe notifica backend Kigolasso
  - Confirmação do jogador muda para "Pago" (status verde)
  - Recibo enviado por email automaticamente (via Stripe)
  - Recibo disponível no app (link para baixar PDF)
- [ ] Dinheiro vai **direto** para conta Stripe do Admin (Kigolasso NÃO retém)

**Cenário - Pagamento com Pix**:

```gherkin
Given jogador confirmou presença no jogo "Sexta 19h"
And valor do jogo é R$ 50
When jogador clica em "Confirmar e Pagar"
Then Payment Link abre com opção "Pagar com Pix"
When jogador seleciona Pix
Then Stripe gera QR Code
When jogador escaneia e paga via app bancário
Then webhook confirma pagamento em <30s
And status muda para "Pago" (verde)
And recibo é enviado por email
```

**Cenário - Pagamento Recusado**:

```gherkin
Given jogador tenta pagar com cartão
When Stripe retorna erro "insufficient_funds"
Then sistema exibe: "Saldo insuficiente. Tente outro cartão ou Pix"
And jogador pode tentar novamente
And status permanece "Confirmado mas não pago" (amarelo)
```

**Definition of Done**:

- Fluxo completo Pix e Cartão testado em Stripe Sandbox
- Webhooks configurados e testados (payment_intent.succeeded, payment_intent.failed)
- Timeout de pagamento: 30min (após isso, vaga retorna para pool)
- Testes de erro (cartão recusado, Pix não pago)

---

#### RF011 - Dashboard de Pagamentos do Admin

**Épico**: Pagamentos  
**Prioridade**: 🟡 Média  
**Estimativa**: 8-10h  
**Dependências**: RF010  
**Paralelizável**: Parcial (design pode começar antes)

**História do Usuário**:  
Como Admin, eu quero acompanhar quem já pagou para cobrar os faltantes.

**Critérios de Aceitação**:

- [ ] Dashboard mostra tabela de jogadores por jogo:
  - Nome do jogador
  - Status de confirmação (Não confirmou / Confirmado / Na fila)
  - Status de pagamento (Não pago / Pago / Estornado)
  - Cor visual: Verde (pago), Amarelo (confirmou mas não pagou), Cinza (não confirmou)
- [ ] Admin pode enviar lembrete de pagamento:
  - Individual: botão ao lado do jogador
  - Em lote: checkbox múltiplo + botão "Enviar Lembretes"
- [ ] Admin pode marcar pagamento manual:
  - Checkbox "Pagou em dinheiro" (status muda para "Pago Manual")
  - Usado quando jogador paga direto na quadra ou em dinheiro
- [ ] Relatório financeiro por jogo:
  - Total arrecadado (via Stripe)
  - Total manual (marcado pelo Admin)
  - Valor da quadra (se aplicável - Fase 2)
  - Sobra/Déficit

**Definition of Done**:

- Dashboard carrega em <500ms (P95)
- Lembretes enviados via push + email
- Testes de marcação manual

---

#### RF012 - Gestão de Estornos e Cancelamentos

**Épico**: Pagamentos  
**Prioridade**: 🟡 Média  
**Estimativa**: 6-8h  
**Dependências**: RF010  
**Paralelizável**: Não

**História do Usuário**:  
Como Admin, eu quero devolver o dinheiro de jogadores que cancelaram com antecedência.

**Critérios de Aceitação**:

- [ ] Se jogador cancela confirmação:
  - Admin decide: "Estornar pagamento" ou "Manter como crédito"
  - Se estornar: Stripe processa devolução (2-5 dias úteis)
  - Se crédito: jogador pode usar em próximo jogo do mesmo time
- [ ] Se jogo é cancelado (não atingiu quórum):
  - Sistema estorna automaticamente todos pagamentos
  - Notificação enviada para todos: "Jogo cancelado. Pagamento será estornado"
- [ ] Limite de estorno: até 90 dias após pagamento (política Stripe)
- [ ] Admin vê histórico de estornos (data, jogador, motivo, status)

**Definition of Done**:

- Fluxo de estorno testado em Stripe Sandbox
- Webhook de refund configurado
- Notificações de estorno enviadas

---

### Epic 5: Assinaturas e Monetização (Fase 1 - MVP)

---

#### RF013 - Trial Gratuito de 7 Dias

**Épico**: Monetização  
**Prioridade**: 🔴 Alta  
**Estimativa**: 6-8h  
**Dependências**: RF001 (Time criado)  
**Paralelizável**: Sim

**História do Usuário**:  
Como novo Admin, eu quero testar o app gratuitamente antes de pagar.

**Critérios de Acaitação**:

- [ ] Ao criar primeiro time, trial de 7 dias é ativado automaticamente (variável configurável)
- [ ] Banner no topo do app: "Trial gratuito: X dias restantes. Experimente todas as funcionalidades!"
- [ ] Durante trial, Admin tem acesso total (criar jogos, sortear, pagamentos)
- [ ] 2 dias antes do fim, notificação push + email: "Seu trial acaba em 2 dias. Assine agora e não perca seus dados!"
- [ ] No último dia, notificação reforçada: "Último dia de trial! Assine hoje com 10% de desconto"
- [ ] Após trial expirar:
  - Funcionalidades bloqueadas (não pode criar novos jogos)
  - Dados preservados por 90 dias
  - Mensagem: "Seu trial expirou. Assine para continuar organizando jogos!"

**Configuração**:

- Variável de ambiente: `TRIAL_DAYS` (padrão: 7)
- Desconto no primeiro mês: `FIRST_MONTH_DISCOUNT` (padrão: 10%)

**Definition of Done**:

- Timer de trial preciso
- Notificações disparadas nas datas corretas
- Bloqueio de funcionalidades após expiração

---

#### RF014 - Assinatura Mensal do Admin

**Épico**: Monetização  
**Prioridade**: 🔴 Alta  
**Estimativa**: 10-12h  
**Dependências**: RF013  
**Paralelizável**: Não  
**Risco**: 🔴 Alto (cobrança recorrente)

**História do Usuário**:  
Como Admin, eu quero assinar o app para continuar organizando meus jogos sem limitações.

**Critérios de Aceitação**:

- [ ] Plano: **R$ 50/mês por time**
- [ ] Admin com múltiplos times paga R$ 50 por cada
- [ ] Pagamento via Stripe Subscriptions (cartão de crédito)
- [ ] Primeira cobrança ao fim do trial (se assinatura feita durante)
- [ ] Admin pode assinar a qualquer momento (antes ou após trial)
- [ ] Renovação automática mensal (pode cancelar a qualquer momento)
- [ ] Ao cancelar assinatura:
  - Admin pode usar até o fim do período pago
  - Após vencimento, time fica inativo (dados preservados por 90 dias)
  - Mensagem: "Sua assinatura foi cancelada. Você pode reativar a qualquer momento"
- [ ] Admin pode reativar assinatura cancelada (time volta a funcionar)
- [ ] Faturas enviadas por email mensalmente (geradas pelo Stripe)

**Tela de Assinatura**:

- [ ] Mostra benefícios: "Organize jogos ilimitados, sorteio inteligente, pagamentos garantidos"
- [ ] Opções: "Assinar Agora" ou "Talvez Depois"
- [ ] Se Admin tem múltiplos times, mostra total: "R$ 50 x 3 times = R$ 150/mês"

**Definition of Done**:

- Cobrança mensal automática funcional
- Webhooks de assinatura configurados (subscription.created, subscription.deleted)
- Cancelamento e reativação testados

---

### 🚫 Epic Removida da Fase 1: Avaliação e Sorteio

**IMPORTANTE**: Conforme análise do QA Specialist, movemos para **Fase 1.5** (2 meses após MVP):

- RF015-RF017: Sistema de Avaliação
- RF018-RF020: Sorteio Inteligente

**Justificativa**:

- Reduzir complexidade inicial do MVP
- Focar em problemas core (organização + pagamento)
- Permitir validação de mercado mais rápida (4 meses vs 6 meses)

**Na Fase 1**, formação de times será **manual** (drag-and-drop simples).

---

## 📊 Requisitos Não-Funcionais (NFRs)

### RNF-001: Performance - Tempos de Resposta

| Operação                    | Target (P95) | Max Aceitável (P99) |
| --------------------------- | ------------ | ------------------- |
| Listagem de jogos           | < 500ms      | < 1s                |
| Criação de jogo             | < 1s         | < 2s                |
| Confirmação de presença     | < 300ms      | < 500ms             |
| Pagamento (redirect Stripe) | < 1s         | < 2s                |
| Busca de quadras (Fase 2)   | < 2s         | < 3s                |

**Critérios de Aceitação**:

- [ ] 95% das requisições devem estar dentro dos targets
- [ ] Monitoramento via CloudWatch/Sentry APM
- [ ] Alertas automáticos se P95 > target por 5min

---

### RNF-002: Capacidade e Escala (Fase 1)

**Limites Mínimos Suportados**:

- **1.000 usuários simultâneos** (navegando no app)
- **100 transações de pagamento/minuto** (horário de pico: 18h-20h)
- **500 jogos criados/dia**
- **10.000 notificações push/minuto**

**Estratégia de Escalabilidade**:

- Backend horizontal (ECS Fargate auto-scaling: min 2, max 10 tasks)
- Read replicas do PostgreSQL para consultas (95% das operações)
- Cache Redis para perfis e avaliações (TTL: 1h)
- CDN CloudFront para assets estáticos

**Testes de Carga**:

- Ferramenta: k6 ou Artillery
- Cenário: 1.500 usuários simultâneos (150% da meta)
- Taxa de falha aceita: < 5%

---

### RNF-003: Disponibilidade (SLOs)

**Uptime Mínimo**: 99.5% (máx 3.6h downtime/mês)

**Horário Crítico** (18h-22h BRT): 99.9% (máx 44min/mês)

**Janela de Manutenção**: Domingos 2h-6h BRT (comunicada com 48h via push/email)

**Critérios de Aceitação**:

- [ ] Monitoramento de uptime via UptimeRobot + CloudWatch
- [ ] Health checks a cada 30s (endpoint `/health`)
- [ ] Alertas em Slack/PagerDuty se downtime > 5min

---

### RNF-004: SLOs Qualitativos (Qualidade de Serviço)

**Operações Críticas** (não podem falhar silenciosamente):

- Confirmação de pagamento
- Atualização de confirmação de presença
- Envio de notificações críticas (jogo cancelado, vaga liberada)

**Estratégias de Resiliência**:

- [ ] Sistema de retry automático para pagamentos (3 tentativas com backoff)
- [ ] Fila dead-letter para notificações não entregues (retry após 5min, 30min, 2h)
- [ ] Alertas automáticos para Admin se taxa de erro > 5%
- [ ] Circuit breaker para integrações externas (Stripe, Firebase)

---

### RNF-005: Segurança - Autenticação e Autorização

**Autenticação**:

- [ ] JWT Access Token expira em 24h
- [ ] Refresh Token expira em 30 dias (rotacionado a cada uso)
- [ ] Senha armazenada com bcrypt (salt rounds: 12)
- [ ] Rate limiting: 100 req/min por usuário, 10 req/min para operações sensíveis

**Autorização**:

- [ ] RBAC implementado via middleware (valida perfil em cada requisição)
- [ ] Matriz de permissões (ver seção dedicada)

**Proteção de Dados**:

- [ ] TLS 1.3 obrigatório (HTTPS em todas comunicações)
- [ ] CPF criptografado em repouso (AES-256)
- [ ] Dados sensíveis mascarados em logs: CPF `***123-45`, Email `j***@***.com`

---

### RNF-006: LGPD (Compliance)

**Consentimento**:

- [ ] Termos de Uso e Política de Privacidade apresentados no onboarding
- [ ] Checkbox explícito de aceite (não pode estar pré-marcado)
- [ ] Usuário pode revisar termos a qualquer momento (seção "Configurações")

**Direitos do Titular**:

- [ ] **Portabilidade**: Exportar dados em JSON via "Configurações > Meus Dados > Exportar"
- [ ] **Exclusão**: Solicitar exclusão completa (dados anonimizados após 90 dias)
- [ ] **Correção**: Editar dados pessoais a qualquer momento
- [ ] **Revogação**: Cancelar assinatura e deletar conta

**DPO (Data Protection Officer)**:

- Indicar responsável: `privacidade@kigolasso.com`

---

### RNF-007: Observabilidade e Monitoramento

**Logs**:

- Winston (estruturados em JSON)
- CloudWatch Logs (retidos por 30 dias)
- Mascaramento de dados sensíveis

**APM (Application Performance Monitoring)**:

- Sentry (frontend + backend)
- Rastreamento de erros em tempo real
- Source maps para stack traces legíveis

**Métricas de Negócio**:

- Dashboard custom (CloudWatch/Grafana):
  - Jogos criados/dia
  - Taxa de conversão trial → pago
  - Taxa de no-show
  - Pagamentos processados/hora

**Alertas**:

- Slack/PagerDuty para:
  - Taxa de erro > 5%
  - P95 latency > targets
  - Pagamentos falhando > 10%
  - Downtime > 5min

---

## 🔐 Matriz de Permissões (RBAC)

| Funcionalidade               | Admin | Técnico | Empresário | Patrocinador | Jogador    | Amigo |
| ---------------------------- | ----- | ------- | ---------- | ------------ | ---------- | ----- |
| **Times**                    |
| Criar Time                   | ✅    | ❌      | ❌         | ❌           | ❌         | ❌    |
| Editar Time                  | ✅    | ❌      | ✅         | ❌           | ❌         | ❌    |
| Excluir Time                 | ✅    | ❌      | ❌         | ❌           | ❌         | ❌    |
| Convidar Membros             | ✅    | ❌      | ✅         | ❌           | ❌         | ❌    |
| Alterar Perfil de Membros    | ✅    | ❌      | ❌         | ❌           | ❌         | ❌    |
| Remover Membros              | ✅    | ❌      | ✅         | ❌           | ❌         | ❌    |
| **Jogos**                    |
| Criar Jogo                   | ✅    | ✅      | ❌         | ❌           | ❌         | ❌    |
| Editar Jogo                  | ✅    | ✅      | ❌         | ❌           | ❌         | ❌    |
| Cancelar Jogo                | ✅    | ❌      | ❌         | ❌           | ❌         | ❌    |
| Confirmar Presença           | ✅    | ✅      | ✅         | ❌           | ✅         | ❌    |
| Entrar na Fila               | ✅    | ✅      | ✅         | ❌           | ✅         | ❌    |
| Ver Lista de Confirmados     | ✅    | ✅      | ✅         | ✅           | ✅         | ✅    |
| Formação Manual de Times     | ✅    | ✅      | ❌         | ❌           | ❌         | ❌    |
| **Pagamentos**               |
| Ver Dashboard Pagamentos     | ✅    | ❌      | ✅         | ❌           | 🔒 Próprio | ❌    |
| Enviar Lembrete de Pagamento | ✅    | ❌      | ✅         | ❌           | ❌         | ❌    |
| Marcar Pagamento Manual      | ✅    | ❌      | ✅         | ❌           | ❌         | ❌    |
| Estornar Pagamento           | ✅    | ❌      | ✅         | ❌           | ❌         | ❌    |
| Ver Relatório Financeiro     | ✅    | ❌      | ✅         | ❌           | ❌         | ❌    |
| **Avaliações (Fase 1.5)**    |
| Ver Avaliação Própria        | ✅    | ✅      | ✅         | ❌           | ✅         | ❌    |
| Ver Avaliações de Outros     | ✅    | ✅      | ❌         | ❌           | ❌         | ❌    |
| Avaliar Outros Jogadores     | ✅    | ✅      | ✅         | ❌           | ✅         | ❌    |
| Editar Avaliação Inicial     | ✅    | ✅      | ❌         | ❌           | 🔒 Própria | ❌    |

**Legenda**:

- ✅ Permitido
- ❌ Negado
- 🔒 Permitido apenas para próprio usuário

---

## 🧪 Estratégia de Testes

### Testes Unitários

**Cobertura Mínima**: 80% do backend (lógica de negócio)

**Ferramentas**:

- Jest (Node.js/TypeScript)
- React Native Testing Library (componentes)

**Prioridades de Teste**:

1. Validações de campos (CPF, idade, email)
2. Lógica de cobrança (cálculo de valores, splits)
3. Sistema de fila de espera (ordem, timeouts)
4. Geração de tokens JWT
5. Cálculo de prazos (trial, confirmações)

**Comandos**:

```bash
npm run test              # Roda todos os testes
npm run test:coverage     # Gera relatório de cobertura
npm run test:watch        # Modo watch (desenvolvimento)
```

---

### Testes de Integração

**Cobertura**: Todos os endpoints de API (100%)

**Mock**: Stripe via Stripe Test Mode (não fazer cobranças reais em testes)

**Ferramentas**:

- Supertest (testes de API)
- Postman/Newman (collections para CI/CD)

**Cenários Prioritários**:

1. Fluxo completo de cadastro → login → criar time → criar jogo
2. Confirmação de presença com e sem pagamento
3. Fila de espera (cancelamento, timeout)
4. Webhooks Stripe (simulados)
5. Estornos e cancelamentos

**Comandos**:

```bash
npm run test:integration
```

---

### Testes E2E (End-to-End)

**Cobertura**: 5 fluxos críticos

**Ferramentas**:

- Detox (React Native)
- Appium (alternativa)

**Fluxos**:

1. **Fluxo do Admin**:
   - Cadastro → Criar time → Criar jogo → Ver confirmações → Dashboard de pagamentos
2. **Fluxo do Jogador**:
   - Cadastro → Receber convite → Aceitar → Confirmar presença → Pagar (Pix)
3. **Fila de Espera**:
   - Jogo lotado → Entrar na fila → Alguém cancela → Receber notificação → Confirmar em 30min
4. **Cancelamento com Estorno**:
   - Jogador paga → Cancela confirmação → Admin estorna → Dinheiro volta em 5 dias
5. **Onboarding Stripe**:
   - Admin cria jogo pago → Stripe Connect → Enviar documentos → Conta aprovada

**Comandos**:

```bash
npm run test:e2e:ios
npm run test:e2e:android
```

---

### Testes de Performance (Load Testing)

**Ferramenta**: k6 (open-source, escrita em JavaScript)

**Cenário de Teste**:

- **1.000 usuários simultâneos** (navegando)
- **50 admins criando jogos** ao mesmo tempo
- **200 confirmações de presença** por minuto
- **100 pagamentos** por minuto

**Métricas Analisadas**:

- P95 e P99 de latência
- Taxa de erro (< 5% aceitável)
- Throughput (req/s)
- Utilização de CPU/RAM (ECS tasks)

**Comandos**:

```bash
k6 run load-tests/scenario-peak-hours.js
```

**Exemplo de Script k6**:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp-up
    { duration: '5m', target: 1000 }, // Pico
    { duration: '2m', target: 0 }, // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // P95 < 500ms
    http_req_failed: ['rate<0.05'], // < 5% de falhas
  },
};

export default function () {
  let res = http.get('https://api.kigolasso.app/games');
  check(res, { 'status 200': r => r.status === 200 });
  sleep(1);
}
```

---

### Testes de Segurança

**Ferramentas**:

- OWASP ZAP (scan automático de vulnerabilidades)
- Snyk (scan de dependências vulneráveis)

**Testes Obrigatórios**:

1. **SQL Injection**: Inputs maliciosos em busca de jogos, cadastro
2. **XSS (Cross-Site Scripting)**: HTML malicioso em nome de time, observações
3. **CSRF**: Tentativa de ação sem token CSRF
4. **Rate Limiting**: Tentativas de login excessivas (deve bloquear após 3)
5. **JWT Manipulation**: Alterar payload do token (deve rejeitar)

**Frequência**: 1x por sprint (semanal durante desenvolvimento)

---

## 🗓️ Roadmap Revisado (Prazos Realistas)

### Fase 1 - MVP Core (4 meses - 16 semanas)

**Objetivo**: Resolver problema central de organização + pagamento garantido

**Funcionalidades Incluídas**:

- ✅ RF001-RF003: Gestão de times e perfis (Semanas 1-2)
- ✅ RF004-RF005: Autenticação e segurança (Semanas 1-2)
- ✅ RF006-RF008: Criação de jogos, confirmações, fila de espera (Semanas 3-6)
- ✅ RF009-RF012: Pagamento via Stripe (onboarding, checkout, estornos) (Semanas 7-12)
- ✅ RF013-RF014: Assinaturas e monetização (Semanas 13-14)
- ✅ Infraestrutura: CI/CD, monitoramento, testes (Semanas 1-16, contínuo)
- ✅ QA e Testes E2E (Semanas 15-16)

**Exclusões da Fase 1**:

- ❌ Sistema de avaliação de jogadores → Fase 1.5
- ❌ Sorteio inteligente → Fase 1.5
- ❌ Busca de quadras → Fase 2
- ❌ Marketplace de jogadores → Fase 2

**Critérios de Lançamento**:

- [ ] 100% das funcionalidades core testadas (unitário + integração + E2E)
- [ ] Beta fechado com 20 times por 2 semanas sem bugs críticos
- [ ] Onboarding completo testado com 10 usuários reais
- [ ] Pagamentos processados com taxa de sucesso > 95%
- [ ] NPS do beta > 60

**Métricas de Sucesso (Mês 1 pós-lançamento)**:

- 50 times ativos
- Taxa de confirmação > 80%
- Taxa de no-show < 10%

---

### Fase 1.5 - Inteligência e Balanceamento (2 meses - 8 semanas)

**Objetivo**: Adicionar diferencial competitivo com sorteio equilibrado

**Funcionalidades**:

- ✅ RF015-RF017: Sistema de avaliação de jogadores (Semanas 1-4)
- ✅ RF018-RF020: Sorteio inteligente + formação manual melhorada (Semanas 5-8)

**Por que separar da Fase 1?**

- MVP funciona bem sem isso (formação manual é suficiente)
- Reduz complexidade inicial (foco em resolver pagamento)
- Permite validar aderência antes de investir em features avançadas

**Critérios de Lançamento**:

- [ ] Algoritmo de balanceamento testado com 100 sorteios simulados (diferença < 5% em 95% dos casos)
- [ ] Avaliações não podem ser manipuladas (validação de entrada)
- [ ] Times com avaliações usam 80%+ do sorteio vs. manual

---

### Fase 2 - Marketplace e Quadras (4 meses - 16 semanas)

**Objetivo**: Conectar jogadores, times e quadras numa rede

**Funcionalidades**:

- ✅ RF021-RF025: Cadastro de quadras, busca geolocalizada, agendamento (Semanas 1-10)
- ✅ RF026-RF028: Marketplace de jogadores, busca de times (Semanas 11-14)
- ✅ RF029: Assinatura de quadras (Semana 15)
- ✅ RF030: Avaliação de quadras (Semana 16)

**Pré-requisitos**:

- Mínimo 500 times ativos (massa crítica para marketplace)
- 20 quadras interessadas em pilotar (pré-venda)

**Métricas de Sucesso (Mês 1 pós-lançamento)**:

- 30% dos jogos agendados via quadras parceiras
- 50 quadras ativas
- Taxa de ocupação das quadras aumenta 40%

---

### Fase 3 - Gamificação e Comunidade (4 meses - 16 semanas)

**Objetivo**: Engajar usuários com competições e social

**Funcionalidades**:

- ✅ RF031-RF034: Sistema de campeonatos (Semanas 1-8)
- ✅ RF035-RF038: Perfis especializados (Técnico, Empresário, Patrocinador) (Semanas 9-12)
- ✅ RF039-RF042: Estatísticas avançadas, rankings (Semanas 13-16)

**Métricas de Sucesso**:

- 50 campeonatos simultâneos
- Aumento de 20% em engajamento (jogos/semana)
- Taxa de retenção mês 6 > 70%

---

## 💾 Modelo de Dados Detalhado

### users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,  -- Criptografado em repouso
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  data_nascimento DATE NOT NULL,
  foto_perfil_url TEXT,
  stripe_customer_id VARCHAR(255),  -- Para assinaturas
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  email_verified BOOLEAN DEFAULT false,
  email_verification_token VARCHAR(255),
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP,
  last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_cpf ON users(cpf);
```

---

### teams

```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,  -- kigolasso.app/times/{slug}
  logo_url TEXT,
  esporte VARCHAR(50) NOT NULL CHECK (esporte IN ('futsal', 'society', 'campo')),
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  cores VARCHAR(255),  -- JSON: ["#FF0000", "#0000FF"]
  descricao TEXT,
  owner_user_id UUID NOT NULL REFERENCES users(id),
  subscription_status VARCHAR(50) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'inactive', 'canceled')),
  subscription_end_date TIMESTAMP,
  trial_end_date TIMESTAMP DEFAULT (now() + interval '7 days'),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_teams_owner ON teams(owner_user_id);
CREATE INDEX idx_teams_slug ON teams(slug);
```

---

### team_members

```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'tecnico', 'empresario', 'patrocinador', 'amigo', 'jogador')),
  status VARCHAR(50) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  joined_at TIMESTAMP DEFAULT now(),
  UNIQUE(team_id, user_id)
);

CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
```

---

### invites

```sql
CREATE TABLE invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  invited_by_user_id UUID NOT NULL REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aceito', 'recusado', 'expirado', 'cancelado')),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  responded_at TIMESTAMP
);

CREATE INDEX idx_invites_token ON invites(token);
CREATE INDEX idx_invites_team ON invites(team_id);
```

---

### games

```sql
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  numero VARCHAR(100) UNIQUE NOT NULL,  -- {team_slug}-{YYYYMMDD}-{seq}
  data_hora TIMESTAMP NOT NULL,
  local TEXT NOT NULL,  -- Fase 1: endereço manual
  venue_id UUID REFERENCES venues(id),  -- Fase 2: quadra parceira
  vagas_total INTEGER NOT NULL CHECK (vagas_total IN (10, 12, 14, 16, 18, 20, 22)),
  valor_por_jogador DECIMAL(10,2) NOT NULL,
  prazo_confirmacao TIMESTAMP,
  exige_pagamento_antecipado BOOLEAN DEFAULT false,
  observacoes TEXT,
  status VARCHAR(50) DEFAULT 'aguardando' CHECK (status IN ('aguardando', 'confirmado', 'cancelado', 'realizado')),
  created_by_user_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_games_team ON games(team_id);
CREATE INDEX idx_games_data_hora ON games(data_hora);
CREATE INDEX idx_games_status ON games(status);
```

---

### game_confirmations

```sql
CREATE TABLE game_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'confirmado' CHECK (status IN ('confirmado', 'fila_espera', 'cancelado')),
  fila_position INTEGER,  -- Posição na fila se status = fila_espera
  fila_notified_at TIMESTAMP,  -- Quando foi notificado que vaga liberou
  fila_expires_at TIMESTAMP,  -- Tem 30min para confirmar após notificação
  pagamento_status VARCHAR(50) DEFAULT 'pendente' CHECK (pagamento_status IN ('pendente', 'pago', 'estornado', 'pago_manual')),
  payment_intent_id VARCHAR(255),  -- Stripe Payment Intent ID
  amount_paid DECIMAL(10,2),
  confirmed_at TIMESTAMP DEFAULT now(),
  canceled_at TIMESTAMP,
  UNIQUE(game_id, user_id)
);

CREATE INDEX idx_game_confirmations_game ON game_confirmations(game_id);
CREATE INDEX idx_game_confirmations_user ON game_confirmations(user_id);
CREATE INDEX idx_game_confirmations_status ON game_confirmations(status);
```

---

### stripe_accounts

```sql
CREATE TABLE stripe_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) UNIQUE,
  stripe_account_id VARCHAR(255) UNIQUE NOT NULL,
  account_type VARCHAR(50) CHECK (account_type IN ('standard', 'express')),
  status VARCHAR(50) DEFAULT 'pendente' CHECK (status IN ('pendente', 'ativa', 'bloqueada', 'rejeitada')),
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_stripe_accounts_user ON stripe_accounts(user_id);
```

---

### venues (Fase 2)

```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  endereco TEXT NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('futsal_coberto', 'society', 'campo')),
  preco_hora DECIMAL(10,2) NOT NULL,
  fotos TEXT[],  -- Array de URLs (S3)
  comodidades TEXT[],  -- ["vestiario", "estacionamento", "lanchonete"]
  owner_user_id UUID NOT NULL REFERENCES users(id),
  stripe_account_id VARCHAR(255),
  subscription_status VARCHAR(50) DEFAULT 'trial',
  subscription_end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_venues_location ON venues USING GIST (ll_to_earth(lat, lng));
```

---

## 🔍 Riscos Atualizados

### Riscos de Produto

**Risco 1: Usuários não migram do WhatsApp**

- **Probabilidade**: Média
- **Impacto**: Alto
- **Mitigação**:
  - Trial grátis de 7 dias sem pedir cartão
  - Feature "Importar lista do WhatsApp" (copy/paste)
  - Depoimentos de admins beta no marketing
  - ROI calculado: "Economize 2h/semana organizando jogos"

---

**Risco 2: Chega+ lança funcionalidades similares**

- **Probabilidade**: Alta (dentro de 6-12 meses)
- **Impacto**: Médio
- **Mitigação**:
  - Velocidade: lançar Fase 1 em 4 meses (vs. concorrentes demoram 8-12)
  - Diferencial defensável: rede de quadras (relacionamento difícil de replicar)
  - Lock-in: dados históricos de avaliações e jogos (custo de migração alto)
  - Engajar early adopters: 1 mês grátis extra se indicar 3 amigos

---

**Risco 3: Taxa de conversão trial → pago baixa (<40%)**

- **Probabilidade**: Média
- **Impacto**: Alto
- **Mitigação**:
  - Email drip durante trial: dica de uso por dia
  - Mostrar ROI claro: "Você economizou R$ 150 evitando calotes este mês!"
  - Desconto de 20% no primeiro mês se converter antes do dia 5 de trial
  - Notificação 48h antes: "Você criou 3 jogos e recebeu R$ 450. Por R$ 50/mês, continue organizando!"

---

### Riscos Técnicos

**Risco 4: Problemas com integração Stripe (CRÍTICO)**

- **Probabilidade**: Baixa (Stripe é maduro)
- **Impacto**: Crítico (sem pagamento = sem negócio)
- **Mitigação**:
  - Ambiente de testes robusto: Stripe Sandbox com cenários de erro
  - Fallback: marcar pagamento manual se Stripe indisponível por >30min
  - Monitoramento 24/7: webhook latency, taxa de sucesso de pagamentos
  - Suporte dedicado: plano Stripe Pro (resposta em <4h)

---

**Risco 5: Push notifications não entregues (>20% de falha)**

- **Probabilidade**: Média (device offline, permissões negadas)
- **Impacto**: Alto (confirmações perdidas)
- **Mitigação**:
  - Firebase Cloud Messaging (99% uptime SLA do Google)
  - Fallback: SMS para notificações críticas (jogo cancelado, vaga liberada) via Twilio
  - Notificações in-app redundantes (badge + lista de não lidas)
  - Email como canal terciário (atraso aceito)

---

### Riscos de Negócio

**Risco 6: Quadras não aderem à plataforma (Fase 2)**

- **Probabilidade**: Média
- **Impacto**: Alto para Fase 2
- **Mitigação**:
  - Trial de 30 dias grátis (vs 7 dias para admins)
  - Comissão 0% para primeiras 50 quadras (recebem 100% via Stripe)
  - Ferramenta de gestão grátis: calendário, relatórios financeiros
  - Equipe comercial: 1 SDR dedicado para onboarding
  - Pré-venda: fechar 20 quadras antes de desenvolver Fase 2

---

**Risco 7: Churn alto por sazonalidade (inverno: -50% de jogos)**

- **Probabilidade**: Alta (futebol sazonal no Sul/Sudeste)
- **Impacto**: Médio (MRR cai no inverno)
- **Mitigação**:
  - Plano anual com desconto: pague 10 meses, ganhe 12 (17% off)
  - Pausar assinatura: dados preservados, pode reativar (vs cancelar)
  - Campeonatos de inverno: gamificação para manter engajamento
  - Expansão geográfica: Norte/Nordeste (menos sazonal)

---

**Risco 8: CAC muito alto vs LTV (CAC > R$ 150)**

- **Probabilidade**: Média
- **Impacto**: Alto (economia unit negativa)
- **Mitigação**:
  - Marketing boca-a-boca: 1 mês grátis por indicação convertida
  - Parcerias com influencers: micro-influencers de futebol amador (10-50k seguidores)
  - SEO local: "quadras perto de mim", "peladas em [cidade]"
  - Freemium para jogadores: apenas admins pagam (viral loop)
  - Meta: CAC < R$ 50 (LTV de R$ 600 em 12 meses = 1:12 ratio)

---

## 📱 Considerações de UX/UI

### Princípios de Design

**1. Simplicidade Radical**

- Cada tela: 1 ação principal
- Máximo 3 níveis de navegação
- Telas carregam em <2s

**2. Mobile-First**

- Uso com uma mão
- Botões principais na parte inferior
- Fontes grandes (16px mínimo)

**3. Feedback Imediato**

- Loading states visíveis
- Confirmação visual de ações
- Erros em linguagem clara (não "erro 400", mas "CPF inválido")

---

### Navegação Principal (Tab Bar)

1. **Home**: Feed de próximos jogos + ações rápidas
2. **Times**: Lista de times do usuário
3. **Perfil**: Configurações + Assinatura

---

### Onboarding (Máximo 3 Telas)

1. **Benefícios**: "Organize peladas em 2 minutos. Pagamento garantido."
2. **Cadastro**: Email, Senha, CPF (validação +18 automática)
3. **Criar ou Buscar Time**: Primeira ação

---

## 📎 Próximos Passos Imediatos

### Semana 1-2 (Setup)

1. ✅ Definir squad: 2 devs mobile (React Native), 1 backend (Node.js), 1 designer, 1 QA
2. ✅ Setup de infraestrutura: repositórios GitHub, AWS, Stripe Sandbox
3. ✅ CI/CD: GitHub Actions (lint, testes, deploy automático para staging)
4. ✅ Monitoramento: Sentry, CloudWatch, health checks
5. ✅ Criar protótipo navegável no Figma (5 telas principais)

---

### Semana 3-4 (Validação e Backlog)

6. ✅ Entrevistar 10 early adopters (admins interessados): validar dores e willingness to pay
7. ✅ Fechar pré-venda: 50 admins interessados em trial (lista de espera)
8. ✅ Criar backlog priorizado no Taskmaster:
   ```bash
   tm parse docs/kigolasso-prd-v2.md --tasks 40
   tm analyze complexity
   tm expand all
   ```
9. ✅ Definir sprints: 2 semanas cada (8 sprints na Fase 1)

---

### Mês 1-2 (Desenvolvimento Core)

10. ✅ Sprint 1-2: Autenticação + Times (RF001-RF005)
11. ✅ Sprint 3-4: Jogos básicos (RF006-RF008)
12. ✅ Testes contínuos: unitários + integração a cada PR

---

### Mês 3-4 (Pagamentos e Launch Prep)

13. ✅ Sprint 5-6: Integração Stripe (RF009-RF012) - **máxima atenção aqui!**
14. ✅ Sprint 7: Assinaturas (RF013-RF014)
15. ✅ Sprint 8: Testes E2E, fixes de bugs, polimento de UX
16. ✅ Beta fechado: 20 times por 2 semanas
17. ✅ Ajustes baseados em feedback do beta
18. ✅ Submissão Google Play + App Store (aprovação leva 1-2 semanas)

---

### Mês 5 (Lançamento)

19. ✅ Campanha de lançamento: redes sociais, lista de espera, influencers
20. ✅ Onboarding dos primeiros 100 times
21. ✅ Monitoramento intensivo: métricas, bugs críticos, suporte ativo
22. ✅ Iterar baseado em feedback: hotfixes semanais

---

## ✅ Checklist de Validação Pré-Taskmaster

- [x] **CC-01**: Seção "Exclusões de Escopo" adicionada (funcional + técnico)
- [x] **CC-02**: Requisitos decompostos (RF014, RF019 removidos da Fase 1)
- [x] **CC-03**: Sorteio e Avaliação movidos para Fase 1.5 (redução de escopo)
- [x] **CC-04**: Campo "Dependências" em todos os RFs (RF001-RF014)
- [x] **CC-05**: Seção "Requisitos Não-Funcionais" criada (7 RNFs)
- [x] **CC-06**: Tech stack completa definida (mobile, backend, infra, CI/CD)
- [x] **CC-07**: Prazo Fase 1 revisado: 3-4 meses → **4 meses** (realista)
- [x] **CC-08**: Matriz RBAC detalhada adicionada
- [x] **CC-09**: Estratégia de Testes completa (unitário, integração, E2E, performance)
- [x] **CC-10**: Exemplos Gherkin em fluxos complexos (RF010)
- [x] **CC-11**: Campos "Prioridade" e "Estimativa" em todos os RFs

---

## 🎯 Status Final: ✅ APROVADO PARA USO COM TASKMASTER

**Melhorias implementadas**:

- Requisitos atômicos (2-16h cada)
- Dependências explícitas (100% dos RFs)
- NFRs robustos (performance, SLOs, segurança)
- Tech stack completa
- Prazo realista (4 meses Fase 1)
- Matriz RBAC
- Estratégia de testes

**Próximo passo**: Executar `tm parse` e começar desenvolvimento! 🚀

---

**Documento vivo**: Este PRD será atualizado conforme aprendizados. Última atualização: 03/10/2025 v2.0
