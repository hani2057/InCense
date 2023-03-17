FROM openjdk:11-jdk-slim

ARG JAR_FILE=build/libs/*SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Dspring.profiles.active=dev", "-jar", "/app.jar"]
