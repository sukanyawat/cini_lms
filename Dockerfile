FROM node:19.9.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run build
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80