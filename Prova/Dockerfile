FROM openjdk:8-jdk-alpine
MAINTAINER Tacila Ferreira
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=target/*.jar
EXPOSE 7177
COPY ${JAR_FILE} Prova.jar
WORKDIR ${JAR_FILE}
ENTRYPOINT java -jar /Prova.jar