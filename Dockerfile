FROM node:18-alpine

ARG APP
WORKDIR /usr/src/app
COPY ./package*.json ./

RUN npm install -g pnpm
RUN pnpm install
COPY . .

ENV APP=${APP}
CMD pnpm run start:dev $APP