
FROM node:13
LABEL author="Hanan Asyrawi Rivai (asyrawih@gmail.com)"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN mv .env.docker .env
RUN npm run build
CMD [ "npm", "run", "prod" ]
