FROM node:12.13.0
MAINTAINER Tacila Ferreira
COPY . /var/frontend
WORKDIR /var/frontend
RUN npm install -g @angular/cli@10.1.7
RUN npm install
EXPOSE 4200
ENTRYPOINT ng serve --host 0.0.0.0