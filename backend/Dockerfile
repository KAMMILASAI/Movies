# Build Stage
FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
ADD src /app/src
RUN mvn clean package -DskipTests

# Run Stage
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/Movies-0.0.1-SNAPSHOT.jar Movies.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "Movies.jar"]
