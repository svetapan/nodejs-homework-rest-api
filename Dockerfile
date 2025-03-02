FROM node:14.18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server"]