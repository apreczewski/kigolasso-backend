# ⚙️ Configuração de Variáveis de Ambiente no Coolify

## 🚨 IMPORTANTE: O Deploy Está Falhando Por Falta de DATABASE_URL

### 📍 Onde Configurar as Variáveis

No painel do Coolify:

1. **Acesse seu projeto** (apreczewski/kigolasso-backend:master)
2. **Clique em "Environment Variables"** (menu lateral esquerdo)
3. **NÃO use "General" ou outras seções** - deve ser em **"Environment Variables"**

### ✅ Como Adicionar Corretamente

Para cada variável:

1. Clique em **"+ Add"** ou **"New Variable"**
2. **Key**: Nome da variável (ex: `DATABASE_URL`)
3. **Value**: Valor da variável (cole o valor completo)
4. **NÃO marque** "Is Preview" ou "Is Build Time" (deixe padrão)
5. Clique em **"Save"** ou **"Add"**
6. **IMPORTANTE**: Após adicionar TODAS as variáveis, clique em **"Save"** no topo da página

### 🔴 Variáveis OBRIGATÓRIAS (Adicione Todas)

Copie e cole exatamente como está:

```bash
DATABASE_URL
postgres://postgres:aa1152de7adc795b749e@146.0.41.71:25432/kigolasso?sslmode=disable

SUPABASE_URL
https://kigolasso-db-sb-kigolasso.iopevd.easypanel.host

SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE

SUPABASE_SERVICE_ROLE_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q

JWT_SECRET
kigolasso-super-secret-jwt-key-production-2026

JWT_EXPIRES_IN
7d

JWT_REFRESH_EXPIRES_IN
30d

NODE_ENV
production

PORT
3000

API_VERSION
v1

CORS_ORIGIN
http://qwgws0ogoo0oc0wg04cowc04.146.0.41.71.sslip.io,https://kigolasso.app

LOG_LEVEL
info

RATE_LIMIT_WINDOW_MS
900000

RATE_LIMIT_MAX_REQUESTS
100
```

### 📸 Como Deve Ficar

Após adicionar todas as variáveis, você deve ver uma lista similar a:

```
DATABASE_URL          = postgres://postgres:aa1152de...
SUPABASE_URL          = https://kigolasso-db-sb-kigola...
SUPABASE_ANON_KEY     = eyJhbGciOiJIUzI1NiIsInR5cCI6...
JWT_SECRET            = kigolasso-super-secret...
NODE_ENV              = production
PORT                  = 3000
...
```

### ⚠️ Erros Comuns

#### ❌ "Variável não está aparecendo no container"

**Causa**: Não salvou as variáveis corretamente

**Solução**:
1. Adicione TODAS as variáveis
2. Clique em "Save" no topo da página
3. Aguarde a mensagem "Saved successfully"
4. Faça um novo deploy manual: **"Deploy" → "Redeploy"**

#### ❌ "DATABASE_URL is not set"

**Causa**: Variável não foi passada para o container

**Solução**:
1. Verifique se a variável está na seção **"Environment Variables"**
2. NÃO deve estar em "Build Variables" ou "Secrets"
3. Após adicionar, faça **Redeploy**

#### ❌ "Connection refused to database"

**Causa**: DATABASE_URL incorreta ou banco inacessível

**Solução**:
1. Verifique se o valor está EXATAMENTE como o fornecido acima
2. Teste conexão do servidor Coolify com o banco:
   ```bash
   # Via SSH no servidor Coolify
   psql "postgres://postgres:aa1152de7adc795b749e@146.0.41.71:25432/kigolasso?sslmode=disable"
   ```

### 🔍 Como Verificar se as Variáveis Foram Aplicadas

Após o deploy:

1. Acesse **"Deployments"**
2. Clique no deployment mais recente
3. Veja os logs - deve mostrar:
   ```
   🚀 Starting Kigolasso Backend...
   ⚠️  No migrations found. Using Prisma db push...
   ✅ Database schema synchronized!
   🔥 Starting Node.js application...
   ```

Se ainda mostrar "❌ ERROR: DATABASE_URL environment variable is not set!", as variáveis NÃO foram aplicadas.

### 🛠️ Redeploy Após Configurar

Depois de adicionar todas as variáveis:

1. **Vá para "Configuration"**
2. Clique em **"Deploy"** (botão no canto superior direito)
3. Ou use **"Deployments" → "Redeploy"** no último deployment

### 🎯 Checklist Final

- [ ] Todas as 14 variáveis obrigatórias adicionadas
- [ ] Salvou as configurações (botão "Save")
- [ ] Viu mensagem de sucesso
- [ ] Iniciou um novo deploy
- [ ] Verificou os logs - não mostra mais erro de DATABASE_URL

### 📞 Ainda Não Funciona?

Se após seguir todos os passos ainda der erro:

1. **Tire um screenshot** da página "Environment Variables" no Coolify
2. **Tire um screenshot** dos logs de deployment
3. **Verifique** se as variáveis estão na seção correta (não em Build Variables)

---

**Última Atualização**: 2026-01-27
**Status**: Aguardando configuração das variáveis no Coolify
