FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@3.6.0 --activate

COPY package.json yarn.lock ./

# (Optional) Clear old installs
RUN rm -rf node_modules

# Install dependencies
RUN yarn install

# ✅ Verify nodemailer is installed
RUN node -e "require('nodemailer'); console.log('✅ Nodemailer is installed and can be required.')"

COPY . .

RUN yarn build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build"]
