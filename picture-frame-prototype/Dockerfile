# Stage 1: build app using node image
FROM node:14 as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --prod

# Stage 2: Serve up the built files using nginx
FROM nginx:latest

COPY --from=build /usr/local/app/dist/picture-frame-prototype /usr/share/nginx/html
EXPOSE 80

