FROM node:latest
RUN mkdir ./app

COPY package.json ./app

COPY ./server.js ./app
WORKDIR ./app
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
