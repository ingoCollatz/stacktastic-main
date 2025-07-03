# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@3.6.0 --activate

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN rm -rf .svelte-kit build # Ensure no stale output
RUN yarn build

# --- Production stage ---
FROM node:20-alpine

WORKDIR /app

# Copy only what's needed to run
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "build"]
