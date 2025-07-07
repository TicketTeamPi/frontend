FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev || npm ci
COPY --from=build /app/dist ./dist
EXPOSE 4173
CMD ["npx", "vite", "preview", "--host"]
