FROM node:20-alpine AS build
WORKDIR /app
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn","start"]
