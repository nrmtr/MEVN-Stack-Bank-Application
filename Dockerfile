FROM node:20

WORKDIR /usr/src/app

COPY /server/package.json ./

RUN npm install 

COPY /server/server.js ./ 

EXPOSE 8000

CMD ["node","server.js"]