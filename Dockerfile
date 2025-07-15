# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including devDependencies) for build
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production image
FROM node:20

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --production

# Copy build output and static assets from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/static ./static

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build/index.js"]
