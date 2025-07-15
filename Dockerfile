# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# install all dependencies (including devDependencies) for build
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# install only production dependencies
RUN npm ci --production

# copy build output and static assets from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/static ./static

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build/index.js"]
