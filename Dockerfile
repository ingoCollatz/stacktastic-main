FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@3.6.0 --activate

COPY . .

RUN rm -rf node_modules && yarn install --frozen-lockfile

RUN node -r ./.pnp.cjs -e "require('nodemailer'); console.log('✅ Nodemailer is installed and can be required.')"

RUN yarn build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build"]
