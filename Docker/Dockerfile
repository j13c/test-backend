FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@8.13.2

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","start:dev"]


##  docker build . -t test-aluxion-image -f .\Docker\Dockerfile
##  docker run -p 3300:3000 -d --network aluxion-network --name aluxion-container-8080  test-aluxion-image