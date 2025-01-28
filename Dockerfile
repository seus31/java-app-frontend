FROM node:22.13.1-alpine

WORKDIR /app

COPY . ./

RUN rm -rf node_modules
RUN rm -rf .nuxt
RUN rm -rf .output

RUN npm install -g pnpm@latest-10

RUN pnpm install
