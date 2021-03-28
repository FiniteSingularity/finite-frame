# Stage 1: build app using node image
FROM node:14 as build

WORKDIR /tmp/app

# Check to see if we have a new commit to build
ADD "https://api.github.com/repos/FiniteSingularity/finite-frame/commits?per_page=1" latest_commit
RUN git clone https://github.com/FiniteSingularity/finite-frame.git
RUN npm install -g @angular/cli
# Build the project
RUN cd finite-frame/picture-frame-prototype; npm install
RUN cd finite-frame/picture-frame-prototype; ng build --prod

# Stage 2: Serve up the built files using nginx
FROM nginx:latest

COPY --from=build /tmp/app/finite-frame/picture-frame-prototype/dist/picture-frame-prototype /usr/share/nginx/html
EXPOSE 80

