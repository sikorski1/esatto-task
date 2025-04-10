FROM node:22 AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:22 AS prod

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm prune --production

EXPOSE 3000
CMD ["npm", "start"]