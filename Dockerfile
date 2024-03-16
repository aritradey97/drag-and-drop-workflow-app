# Stage 1: Build the Angular application
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/angular-drag-drop/ /usr/share/nginx/html
EXPOSE 80
