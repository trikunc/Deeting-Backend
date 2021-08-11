FROM node:14.17.4-alpine3.14
LABEL author="Hanan Asyrawi Rivai (asyrawih@gmail.com)"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN mv .env .env
RUN npm run build
CMD [ "npm", "run", "prod" ]
