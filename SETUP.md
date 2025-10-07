# Kigolasso Backend - Setup Guide

## 🏗️ Arquitetura do Projeto

O projeto Kigolasso foi separado em dois repositórios para melhor organização:

- **Frontend (Mobile)**: [kigolasso](https://github.com/apreczewski/kigolasso) - React Native (Expo)
- **Backend (API)**: [kigolasso-backend](https://github.com/apreczewski/kigolasso-backend) - Node.js + Express + TypeScript

## 🎯 Task Master Integration

O Task Master foi configurado no repositório frontend principal, mas as tasks de backend estão sendo sincronizadas aqui através de Issues GitHub.

### Tasks de Backend Principais

| Task | Issue | Descrição | Status |
|------|-------|-----------|--------|
| TM-2 | [#1](https://github.com/apreczewski/kigolasso-backend/issues/1) | Configurar Backend Node.js | ✅ Completa |
| TM-3 | [#2](https://github.com/apreczewski/kigolasso-backend/issues/2) | Sistema de Autenticação JWT | 🔄 Próxima |
| TM-9 | [#3](https://github.com/apreczewski/kigolasso-backend/issues/3) | PostgreSQL com Prisma | 🔄 Pendente |
| TM-34 | [#4](https://github.com/apreczewski/kigolasso-backend/issues/4) | Pagamentos Stripe | 🔄 Pendente |

## 🚀 Quick Start

1. **Clone e instale dependências**:
```bash
git clone https://github.com/apreczewski/kigolasso-backend.git
cd kigolasso-backend
npm install
```

2. **Configure ambiente**:
```bash
cp .env.example .env
# Edite .env com suas configurações
```

3. **Setup banco de dados**:
```bash
npm run db:generate
npm run db:push
```

4. **Inicie servidor de desenvolvimento**:
```bash
npm run dev
```

## 🔄 Workflow de Desenvolvimento

Seguindo o padrão estabelecido no projeto principal:

1. **Escolher Issue/Task** do GitHub
2. **Criar branch**: `issue-X-descricao`
3. **Desenvolver** seguindo subtasks
4. **Testes**: `npm test`
5. **Commit**: `feat: [X.Y] descrição`
6. **PR**: Referenciar Issue
7. **Code Review** e merge

## 🔗 Links Importantes

- **Frontend Repo**: https://github.com/apreczewski/kigolasso
- **Task Master Tasks**: https://github.com/apreczewski/kigolasso/issues
- **Backend Issues**: https://github.com/apreczewski/kigolasso-backend/issues
- **Documentação Completa**: [kigolasso/docs](https://github.com/apreczewski/kigolasso/tree/master/docs)

## 📱 Integração Frontend ↔ Backend

O app React Native irá consumir esta API:

```typescript
// Exemplo de configuração no frontend
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
```

## 🎯 Próximos Passos

1. ✅ **Task #2 (Completa)**: Backend inicializado
2. 🔄 **Task #3**: Implementar autenticação JWT
3. 🔄 **Task #9**: Configurar PostgreSQL + Prisma
4. 🔄 **Task #34**: Integrar pagamentos Stripe

---

**Status**: Backend inicializado ✅ | Pronto para desenvolvimento da Task #3