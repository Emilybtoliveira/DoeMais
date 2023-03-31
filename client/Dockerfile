FROM node:16.18.1 as build-stage

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .

RUN yarn run build

FROM nginx:stable-alpine as production-stage
COPY ./proxy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/build /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
