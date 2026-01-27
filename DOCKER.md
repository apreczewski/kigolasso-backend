# 🐳 Docker Deployment Guide - Kigolasso Backend

Este guia explica como fazer o deploy do backend usando Docker no Coolify.

## 📋 Arquivos Docker

### Estrutura Criada

```
kigolasso-backend/
├── Dockerfile              # Multi-stage build otimizado
├── .dockerignore          # Arquivos a ignorar no build
├── docker-compose.yml     # Para testes locais
├── docker-entrypoint.sh   # Script de inicialização
└── DOCKER.md             # Este arquivo
```

### 🎯 Dockerfile Multi-Stage

O Dockerfile foi otimizado em 3 estágios:

1. **deps**: Instala dependências de produção e gera Prisma Client
2. **builder**: Compila TypeScript
3. **runner**: Imagem final leve com apenas o necessário

**Benefícios:**
- ✅ Imagem final pequena (~150MB vs ~800MB sem otimização)
- ✅ Segurança: usuário não-root
- ✅ Health check configurado
- ✅ Signal handling com dumb-init

## 🚀 Deploy no Coolify

### 1. Configuração Atual

Sua configuração no Coolify já está correta:

- **Build Pack**: Dockerfile ✅
- **Base Directory**: `/` ✅
- **Domain**: Configurado ✅

### 2. Variáveis de Ambiente Necessárias

Configure estas variáveis no Coolify (seção "Environment Variables"):

#### **Obrigatórias:**

```bash
# Database
DATABASE_URL=postgres://user:pass@host:port/database

# Supabase
SUPABASE_URL=https://your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Application
NODE_ENV=production
PORT=3000
API_VERSION=v1

# CORS (ajuste para seu domínio de produção)
CORS_ORIGIN=https://your-frontend-domain.com
```

#### **Opcionais mas Recomendadas:**

```bash
# Stripe (se usar pagamentos)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Firebase (se usar push notifications)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@....iam.gserviceaccount.com

# AWS S3 (se usar uploads)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# Email (se usar)
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email-user
EMAIL_PASS=your-email-password
EMAIL_FROM="Kigolasso <noreply@kigolasso.com>"
FRONTEND_URL=https://your-frontend-domain.com
```

### 3. Deploy Automático

Após fazer commit dos arquivos Docker:

```bash
git add Dockerfile .dockerignore docker-entrypoint.sh
git commit -m "feat: add Docker configuration for Coolify deployment"
git push origin main
```

O Coolify detectará o push e iniciará o build automaticamente.

### 4. Monitoramento do Deploy

1. Acesse a aba **"Deployments"** no Coolify
2. Clique em **"Show Debug Logs"** para ver o progresso
3. O build deve levar ~5-10 minutos na primeira vez
4. Verificar se o health check passa: `/health`

### 5. Verificação Pós-Deploy

Teste se a API está rodando:

```bash
# Health check
curl https://your-domain.com/health

# Deve retornar:
# {"status":"OK","timestamp":"...","uptime":...,"environment":"production"}
```

## 🧪 Testes Locais

### Opção 1: Docker Compose (Recomendado)

```bash
# Build e start
docker-compose up --build

# Em outro terminal, testar
curl http://localhost:3000/health

# Parar
docker-compose down
```

### Opção 2: Docker Manual

```bash
# Build
docker build -t kigolasso-backend .

# Run
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e SUPABASE_URL="your-supabase-url" \
  -e SUPABASE_ANON_KEY="your-key" \
  -e JWT_SECRET="your-secret" \
  kigolasso-backend

# Testar
curl http://localhost:3000/health
```

## 🔧 Troubleshooting

### Erro: "Prisma migrate deploy failed"

**Solução:** O entrypoint script usa `prisma db push` se não houver migrations.

Se você tem migrations, certifique-se de commitá-las:

```bash
# Criar migration
npm run db:migrate

# Commitar migrations
git add prisma/migrations/
git commit -m "feat: add database migrations"
git push
```

### Erro: "DATABASE_URL is not set"

**Solução:** Configure a variável no Coolify:

1. Environment Variables → Add
2. Key: `DATABASE_URL`
3. Value: Sua connection string do PostgreSQL

### Erro: "Port 3000 already in use"

**Solução:** A variável PORT no Coolify deve ser 3000 (padrão da app).

### Build muito lento

**Solução:**
- .dockerignore já está configurado para excluir node_modules, dist, etc.
- Primeira build é lenta (~10min), próximas serão mais rápidas (~2-3min) devido ao cache

### Aplicação não inicia

**Verifique:**

1. Logs no Coolify (Deployments → Show Debug Logs)
2. Health check endpoint: `/health`
3. Se DATABASE_URL está correto e acessível
4. Se as migrations rodaram com sucesso

## 📊 Banco de Dados

### Migrations vs DB Push

O entrypoint script detecta automaticamente:

- **Se há migrations**: Roda `prisma migrate deploy`
- **Se NÃO há migrations**: Roda `prisma db push`

### Criar Primeira Migration

```bash
# Localmente
npm run db:migrate

# Isso cria arquivos em prisma/migrations/
# Commite-os para o repositório
git add prisma/migrations/
git commit -m "feat: initial database migration"
git push
```

## 🔐 Segurança

### Checklist de Segurança

- ✅ Usuário não-root no container
- ✅ NODE_ENV=production
- ✅ Helmet.js ativado
- ✅ Rate limiting configurado
- ✅ CORS restrito ao domínio de produção
- ✅ Secrets em variáveis de ambiente (não no código)
- ✅ .dockerignore exclui .env e arquivos sensíveis

### Recomendações Adicionais

1. **CORS_ORIGIN**: Configure apenas para seu domínio de produção
2. **JWT_SECRET**: Use um secret forte (mínimo 32 caracteres aleatórios)
3. **Database**: Use SSL/TLS se possível
4. **Secrets**: NUNCA commite .env no git

## 📈 Performance

### Otimizações Aplicadas

- Multi-stage build (imagem final ~150MB)
- Alpine Linux (base mínima)
- Cache de layers do Docker
- Health check para auto-restart

### Monitoramento

O Coolify monitora automaticamente:
- CPU e memória
- Health checks
- Logs de erro

Acesse via: **Metrics** no painel do Coolify

## 🚀 Next Steps

Após deploy bem-sucedido:

1. ✅ Configurar domínio customizado no Coolify
2. ✅ Configurar SSL/TLS (Let's Encrypt automático)
3. ✅ Testar todos os endpoints
4. ✅ Configurar alertas no Coolify
5. ✅ Documentar APIs (Swagger/OpenAPI)

## 📚 Referências

- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Coolify Documentation](https://coolify.io/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

---

**Criado**: 2026-01-27
**Projeto**: Kigolasso Backend API
**Ambiente**: Production (Coolify)
