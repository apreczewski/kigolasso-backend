#!/bin/sh
# ============================================
# Docker Entrypoint Script for Kigolasso Backend
# Handles database migrations before starting the app
# ============================================

set -e

echo "🚀 Starting Kigolasso Backend..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL environment variable is not set!"
  exit 1
fi

# Check if migrations directory exists and has migrations
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  echo "📊 Running Prisma database migrations..."
  npx prisma migrate deploy
  echo "✅ Migrations completed successfully!"
else
  echo "⚠️  No migrations found. Using Prisma db push..."
  npx prisma db push --skip-generate --accept-data-loss
  echo "✅ Database schema synchronized!"
fi

echo "🔥 Starting Node.js application..."
exec node dist/index.js
