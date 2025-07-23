FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run prepare
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", "build"]
