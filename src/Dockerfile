#defino a configuração da imagem docker que irie utilizar. e atribuo um alias;
FROM node:20-alpine AS development-dependencies-env
#copio tudo dentro de /src;
COPY . /src
#defino o diretório de trabalho remóto como /app;
WORKDIR /app
#executo comando npm ci;
RUN npm ci

#defino a configuração da imagem docker que irie utilizar. e atribuo um alias;
FROM node:20-alpine AS production-dependencies-env
#copio o package.json e o package-lock e a src;
COPY ./package.json package-lock.json /src/
#defino o diretório de trabalho remóto como /app;
WORKDIR /app
#executo comando npm ci --omit=dev;
RUN npm ci --omit=dev

#defino a configuração da imagem docker que irie utilizar. e atribuo um alias;
FROM node:20-alpine AS build-env
#copio tudo dentro de /src;
COPY . /src/
#copio toda a imagem 'development-dependencies-env' e node_modules;
COPY --from=development-dependencies-env /src/node_modules /src/node_modules
#defino o diretório de trabalho remóto como /app;
WORKDIR /app
#executo comando npm run build;
RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /src/
COPY --from=production-dependencies-env /src/node_modules /src/node_modules
COPY --from=build-env /src/build /src/build
#defino o diretório de trabalho remóto como /app
WORKDIR /app
CMD ["npm", "run", "start"]