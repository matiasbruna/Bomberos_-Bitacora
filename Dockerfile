FROM node:18-bullseye

WORKDIR /app  

COPY .  .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
