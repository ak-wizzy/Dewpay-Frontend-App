#FROM node:16 AS build
FROM 122939799774.dkr.ecr.eu-west-1.amazonaws.com/node-16:node-v16 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build-prod


#FROM nginx:1.17.1-alpine
FROM 122939799774.dkr.ecr.eu-west-1.amazonaws.com/nginx-1.17.1-alpine:nginx-1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/skote /usr/share/nginx/html