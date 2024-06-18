# Step 1: Build the Angular app
FROM node:18 AS build
WORKDIR /app/frontend
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Step 2: Serve the Angular app using Nginx
FROM nginx:latest
COPY --from=build /usr/local/var/www /etc/nginx/html
COPY --from=build /usr/local/var/www/assets /etc/nginx/html/assets
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]