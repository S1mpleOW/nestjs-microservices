FROM node:alpine AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY --from=build /app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]
