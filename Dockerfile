# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@3.6.0 --activate

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN rm -rf .svelte-kit build
RUN yarn build

# --- Production stage ---
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@3.6.0 --activate

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/build ./build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "build"]
