FROM node:lts-alpine as build-stage
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/admin.conf /etc/nginx/conf.d/admin.conf
COPY ./key /etc/nginx/key

COPY --from=build-stage ./build /usr/share/nginx/html/admin
CMD ["nginx", "-g", "daemon off;"]
