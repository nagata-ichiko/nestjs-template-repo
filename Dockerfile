FROM node:19.5.0
WORKDIR /api

COPY . /api

RUN npm i -g @nestjs/cli
RUN npm i -g prisma
RUN npm install
RUN npm run build
CMD npm run start

EXPOSE 3000
