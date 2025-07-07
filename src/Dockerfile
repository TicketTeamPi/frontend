
#defino a configuração da imagem docker que irie utilizar. e atribuo um alias;
FROM node:20-alpine AS build-env
#defino o diretório de trabalho remóto como /app;
WORKDIR /app
#copio toda a imagem 'development-dependencies-env' e node_modules;
COPY --from=development-dependencies-env /app/node_modules ./node_modules
#copio tudo dentro de /src;
COPY . .
#executo comando npm run build;
RUN npm run build

FROM node:20-alpine
#defino o diretório de trabalho remóto como /app
WORKDIR /app
COPY package*.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/dist ./dist
CMD ["npm", "run", "start"]