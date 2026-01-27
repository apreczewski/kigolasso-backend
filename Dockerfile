# ============================================
# Multi-stage Dockerfile for Kigolasso Backend
# Optimized for production deployment
# ============================================

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps

WORKDIR /app

# Install dependencies needed for native builds
RUN apk add --no-cache libc6-compat openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Generate Prisma Client
RUN npx prisma generate

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy source code
COPY . .

# Install dev dependencies for build
RUN npm install --only=development

# Generate Prisma Client (ensure it's available for build)
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# ============================================
# Stage 3: Runner (Production)
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Install dumb-init for proper signal handling and wget for healthcheck
RUN apk add --no-cache dumb-init openssl wget

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 kigolasso

# Copy production dependencies
COPY --from=deps --chown=kigolasso:nodejs /app/node_modules ./node_modules
COPY --from=deps --chown=kigolasso:nodejs /app/package*.json ./

# Copy built application
COPY --from=builder --chown=kigolasso:nodejs /app/dist ./dist
COPY --from=builder --chown=kigolasso:nodejs /app/prisma ./prisma

# Copy start script
COPY --chown=kigolasso:nodejs docker-entrypoint.sh ./

# Make entrypoint executable
RUN chmod +x docker-entrypoint.sh

# Create logs directory with proper permissions
RUN mkdir -p /app/logs && chown -R kigolasso:nodejs /app/logs

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose application port
EXPOSE 3000

# Switch to non-root user
USER kigolasso

# Health check (using wget as required by Coolify)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Run the application
CMD ["./docker-entrypoint.sh"]
