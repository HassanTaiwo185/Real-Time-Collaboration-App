FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci 

COPY . .

ARG VITE_API_URL
ARG VITE_WS_URL
RUN npm run build

# Stage 2: Run the frontend with Nginx
FROM nginx:alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

USER 101

EXPOSE 8080