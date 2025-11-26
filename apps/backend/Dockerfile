# Build stage
FROM node:18-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY .npmrc* ./

# Copy all workspace packages
COPY packages ./packages
COPY apps/backend ./apps/backend

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build shared packages
RUN pnpm --filter @interview-platform/types build
RUN pnpm --filter @interview-platform/shared build

# Build backend
RUN pnpm --filter @interview-platform/backend build

# Production stage
FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Create logs directory
RUN mkdir -p /app/apps/backend/logs

WORKDIR /app/apps/backend

EXPOSE 5000

CMD ["node", "dist/index.js"]