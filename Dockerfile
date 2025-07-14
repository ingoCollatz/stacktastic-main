FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@3.6.0 --activate

RUN rm -rf node_modules

COPY package.json yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build"]

