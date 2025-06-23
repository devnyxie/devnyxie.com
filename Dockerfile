FROM node:24-alpine AS builder

WORKDIR /app

COPY . .

RUN corepack enable
RUN yarn install
RUN yarn build

FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./

RUN corepack enable
RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]