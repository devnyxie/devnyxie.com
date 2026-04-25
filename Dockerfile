# Use Node 22 Alpine
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat python3 make g++

# Stage 1: Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Stage 2: Build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env* ./  # for build-time env

# Disable telemetry to avoid warnings
ENV NEXT_TELEMETRY_DISABLED=1
# If your build needs git commit info, optionally copy .git:
# COPY .git .git

RUN pnpm build

# Stage 3: Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.env* ./  # runtime env

RUN mkdir .next && chown nextjs:nodejs .next
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]