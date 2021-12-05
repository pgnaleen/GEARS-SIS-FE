FROM node:16-buster as build-stage

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli@12.2.0

RUN ng build --configuration "production"

RUN ls /app/dist/

FROM twalter/openshift-nginx

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

EXPOSE 8081

CMD ["nginx", "-g", "daemon off;"]
