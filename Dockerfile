# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production image
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /app/.svelte-kit/output ./build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build/server/index.js"]
