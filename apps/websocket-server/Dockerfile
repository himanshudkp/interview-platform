# Build stage
FROM node:18-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY .npmrc* ./
COPY apps/websocket-server ./apps/websocket-server

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @interview-platform/websocket-server build

# Production stage
FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app/apps/websocket-server/dist ./apps/websocket-server/dist
COPY --from=builder /app/apps/websocket-server/package.json ./apps/websocket-server/
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

RUN mkdir -p /app/apps/websocket-server/logs

WORKDIR /app/apps/websocket-server

EXPOSE 1234

CMD ["node", "dist/index.js"]