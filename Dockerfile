FROM node:alpine3.18

WORKDIR /myapp

COPY package.json .

RUN npm install

EXPOSE 6000

COPY . .

CMD ["npm", "run", "start"]