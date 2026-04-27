FROM node:24-alpine AS base
WORKDIR /app

# Required for native deps
RUN apk add --no-cache libc6-compat python3 make g++

# Enable pnpm via Corepack (best practice)
RUN corepack enable

# Dependencies stage
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env* ./

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# Runtime stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.env* ./

RUN mkdir -p .next && chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]