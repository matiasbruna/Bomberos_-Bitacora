<<<<<<< HEAD
FROM node:18-bullseye

WORKDIR /app  

COPY .  .
=======
FROM node:18.17.0

COPY . .
>>>>>>> master

RUN npm install

EXPOSE 3000

<<<<<<< HEAD
CMD [ "npm", "run", "dev" ]
=======
CMD ["npm ", "run", "dev" ]


>>>>>>> master
