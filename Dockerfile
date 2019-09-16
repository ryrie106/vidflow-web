# Stage 1
FROM node:12.4.0-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

# ARG VIDFLOW_BASE_URL
# ENV VIDFLOW_BASE_URL=${VIDFLOW_BASE_URL}

RUN npm run build

# Stage 2
FROM nginx:1.17.3-alpine

COPY --from=build /app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]