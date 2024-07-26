FROM node:20-alpine
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY build ./

EXPOSE 3000

CMD ["node", "index.js"]
