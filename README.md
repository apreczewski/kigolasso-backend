# Kigolasso Backend API

Backend Node.js + TypeScript para a plataforma Kigolasso - gestão de peladas amadoras.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0+
- Supabase project (or PostgreSQL database)
- npm ou yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Setup Supabase:
   - Create a new project at https://supabase.com
   - Get your project URL and service role key
   - Add them to your .env file

4. Setup database (if using local Prisma):
```bash
npm run db:generate
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

## 📚 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations

## 🏗️ Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── models/          # Data models
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── test/            # Test files
```

## 🔧 Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Push Notifications**: Firebase Admin
- **Validation**: Zod
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier

## 📖 API Documentation

API documentation will be available at `/api/docs` when Swagger is implemented.

### Health Check

```
GET /health
```

Returns server status and uptime information.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🔒 Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `DATABASE_URL` - PostgreSQL connection string (if using local Prisma)
- `STRIPE_SECRET_KEY` - Stripe API key
- `FIREBASE_*` - Firebase configuration

## 🤝 Development Workflow

This project follows the Kigolasso development workflow:

1. Pick a task from GitHub Issues
2. Create branch: `issue-XX-description`
3. Develop following subtasks
4. Run tests and linting
5. Create PR referencing the issue
6. Code review and merge

## 📄 License

MIT