# Claude Code Instructions

## 🚨 LEITURA OBRIGATÓRIA ANTES DE QUALQUER TRABALHO

**REGRA FUNDAMENTAL**: Toda LLM DEVE ler integralmente este documento e os arquivos referenciados antes de iniciar qualquer trabalho.

**⚠️ ATENÇÃO**: O PRD oficial está em `docs/invoice-management-prd.md` no repositório mobile. SEMPRE leia o PRD para entender o projeto corretamente. Kigolasso é uma plataforma de gestão de peladas amadoras, NÃO é plataforma de apostas!

### ⚠️ CHECKPOINT OBRIGATÓRIO

**ANTES DE TRABALHAR, VOCÊ DEVE:**

1. **Ler completamente**:

   - Este arquivo (CLAUDE.md)
   - `.taskmaster/CLAUDE.md` (Task Master workflow - no repo mobile)
   - `.taskmaster/rules/dev-workflow.md` (Workflow completo - no repo mobile)
   - `docs/taskmaster-github-sync.md` (Sincronização GitHub - no repo mobile)
   - `docs/BUILD-LOG.md` (Histórico do projeto - ONDE PAROU)

2. **Gerar um resumo das diretrizes** para o usuário, incluindo:

   - Qual o objetivo do projeto Kigolasso
   - Qual workflow deve ser seguido (Taskmaster → GitHub → Development)
   - Quais são as etapas obrigatórias antes de criar tasks
   - Qual padrão deve ser usado para Issues no GitHub
   - Quais comandos/ferramentas deve usar
   - **ONDE O PROJETO PAROU** (últimas entradas do BUILD-LOG.md)

3. **Aguardar confirmação** do usuário antes de prosseguir

**❌ PROIBIDO**: Iniciar qualquer trabalho sem demonstrar compreensão das diretrizes.

### 🚀 MODO AUTÔNOMO

**Após confirmação inicial do usuário**, a LLM pode trabalhar de forma autônoma:

- ✅ Executar tarefas completas sem pedir permissão a cada passo
- ✅ Seguir o workflow documentado automaticamente
- ✅ Criar Issues, scripts, documentação conforme necessário
- ✅ Apenas informar o que está fazendo, não pedir autorização
- ⚠️ **SEMPRE** seguir o padrão exato estabelecido (Issue #2)

---

## Task Master AI Instructions

**O Task Master está configurado no repositório mobile (`kigolasso-mobile`).**
- Todas as tasks são gerenciadas a partir do repositório mobile
- Use MCP tools com `projectRoot` apontando para o mobile
- Documentação completa em `.taskmaster/CLAUDE.md` no repo mobile

## Development Workflow Guidelines

**O workflow completo está documentado no repositório mobile:**
- `.taskmaster/rules/dev-workflow.md`
- Aplicam-se as mesmas regras para o backend

## GitHub Integration

### 🔄 FLUXO OBRIGATÓRIO DE SETUP

**ORDEM OBRIGATÓRIA ANTES DE CRIAR TASKS NO GITHUB:**

1. **PRIMEIRO**: Criar/Verificar Labels no GitHub
2. **SEGUNDO**: Criar/Verificar Milestones (Sprints)
3. **TERCEIRO**: Sincronizar Tasks do Taskmaster → GitHub Issues

**❌ NUNCA criar Issues sem labels e milestones configurados primeiro!**

### 🔄 SINCRONIZAÇÃO OBRIGATÓRIA TASK MASTER ↔ GITHUB

**REGRA FUNDAMENTAL**: Task Master e GitHub Issues devem estar SEMPRE sincronizados!

**Ao iniciar uma task:**

1. Atualizar status no Task Master para `in-progress` usando:
   ```bash
   # Do repositório mobile
   mcp: set_task_status --id=<id> --status=in-progress
   # ou
   task-master set-status --id=<id> --status=in-progress
   ```
2. DEPOIS criar branch no GitHub: `./scripts/start-task.sh <issue-number>`

**Ao completar uma task:**

1. Atualizar status no Task Master para `done`
2. Fechar Issue no GitHub via PR (Closes #X)

**Estados válidos:** `pending`, `in-progress`, `done`, `blocked`, `deferred`, `cancelled`

### 📋 PADRÃO OBRIGATÓRIO DE ISSUES

**Toda Issue deve seguir EXATAMENTE o padrão da Issue #2:**

```markdown
Título: [Task-X] Nome da Task

Body:

## 📋 Descrição

[Descrição da task]

### Detalhes Técnicos

[Campo details do Taskmaster]

## ⏱️ Estimativa

X-Y horas

## ✅ Checklist de Subtasks

- [ ] [X.1] Subtask 1
- [ ] [X.2] Subtask 2

## 🧪 Critério de Aceitação

[Campo testStrategy do Taskmaster]

## 🔗 Task Master

**ID**: TM-X
**Prioridade**: [Alta/Média/Baixa]
**Complexidade**: X/10
```

**Labels obrigatórios**: `taskmaster`, `priority-X`, `categoria-técnica`, `tipo-trabalho`
**Milestone obrigatório**: Sprint correspondente

## Documentação Obrigatória

**Logging de Tarefas**: Ao concluir uma tarefa ou um marco significativo, é mandatório adicionar uma entrada no log de construção (`docs/BUILD-LOG.md`). A entrada deve detalhar a ação realizada, a justificativa e o resultado.

## Project Build History

**For historical context and technical decisions:**

- [docs/BUILD-LOG.md](./docs/BUILD-LOG.md) - Complete build log with all decisions and configurations

---

## 🏗️ Arquitetura Backend

### Stack Técnica

- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js 4.19.2
- **Language**: TypeScript 5.6.2
- **Database**: PostgreSQL 16 + Prisma ORM 5.19.1
- **Authentication**: JWT (jsonwebtoken)
- **Payment**: Stripe 16.12.0
- **Push Notifications**: Firebase Admin
- **Security**: helmet, cors, express-rate-limit
- **Logging**: Winston
- **Testing**: Jest + Supertest

### Estrutura de Pastas

```
src/
├── controllers/    # Controladores Express (req/res)
├── services/       # Lógica de negócio
├── models/         # Modelos Prisma (gerados)
├── middleware/     # Auth, error handling, validation
├── routes/         # Definição de rotas
├── types/          # TypeScript interfaces
├── utils/          # Funções auxiliares
├── config/         # Configurações
└── prisma/         # Schema e migrações
```

### Banco de Dados

**PostgreSQL via Docker Compose:**
- Container: `kigolasso-postgres`
- Porta: 5432
- Volume persistente configurado

**Prisma Models:**
- User (roles: PLAYER, ORGANIZER, ADMIN)
- Team
- TeamMember
- Game
- GameParticipant
- Payment

### Scripts Importantes

```bash
# Desenvolvimento
npm run dev          # Servidor com hot reload
npm run build        # Build TypeScript
npm run typecheck    # Verificação de tipos

# Banco de Dados
npm run db:init      # Setup completo (Docker + migrations + seed)
npm run db:migrate   # Executar migrações
npm run db:studio    # Interface visual Prisma
npm run db:reset     # Reset completo

# Qualidade
npm run lint         # ESLint
npm run test         # Jest
npm run format       # Prettier
```

---

## 🎯 EXEMPLO PRÁTICO DE INÍCIO DE TRABALHO

**Quando uma LLM chegar neste projeto, deve:**

1. **Ler todas as diretrizes** mencionadas acima
2. **Gerar resumo** similar a este exemplo:

```markdown
## 📋 Resumo das Diretrizes - Projeto Kigolasso Backend

### Objetivo do Projeto

API backend para plataforma de gestão de peladas amadoras (futebol amador)
- Autenticação JWT
- Gestão de times e jogos
- Pagamentos via Stripe
- Integração com app React Native

### Workflow Obrigatório

Taskmaster (no mobile) → GitHub Issues → Branches → Development → PRs → Review → Merge

### Etapas Obrigatórias ANTES de criar tasks:

1. ✅ Verificar/Criar labels no GitHub
2. ✅ Verificar/Criar milestones (Sprints)
3. ✅ Usar padrão exato da Issue #2 para novas Issues

### Ferramentas Principais

- Task Master MCP (executar do repo mobile)
- GitHub CLI (gh) para Issues/PRs
- Scripts em /scripts/ para automação
- BUILD-LOG.md para documentar decisões

### Status Atual do Projeto

[Resumir últimas 2-3 entradas do BUILD-LOG.md]

- Última ação: [O que foi feito]
- Próximo passo: [O que precisa ser feito]

Confirma que entendi e posso prosseguir?
```

3. **Aguardar confirmação** antes de qualquer ação

**🚨 LEMBRE-SE**: Não há exceções a este fluxo!

---

## ⚠️ Trabalho em Múltiplos Repositórios

**Este é o repositório BACKEND. O repositório MOBILE está em:**
- `/Users/apreczewski/projects/kigolasso-mobile`

**Quando precisar alternar entre repositórios**:
1. PARE e informe o usuário sobre a necessidade
2. Documente o que foi feito até o momento
3. Solicite que o usuário abra nova sessão do Claude Code no outro repositório
4. OU peça ao usuário para executar comandos necessários

**NUNCA**:
- Faça alterações diretas sem seguir o workflow de git
- Pule a criação de branches e commits
- Continue sem o setup adequado do ambiente

**SEMPRE**:
- Siga o workflow: branch → commits → PR
- Mantenha Task Master sincronizado
- Documente no BUILD-LOG.md