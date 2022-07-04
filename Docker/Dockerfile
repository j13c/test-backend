FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@8.13.2

RUN npm install

COPY . .

EXPOSE 3300

CMD ["npm","run","start:dev"]

##  docker build . -t test-aluxion-container -f .\Docker\Dockerfile