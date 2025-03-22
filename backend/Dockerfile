# Use Maven to build the application
FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app  # Set working directory
COPY backend /app  # Copy only the backend folder
WORKDIR /app  # Ensure we are inside the backend directory
RUN mvn clean package -DskipTests

# Use OpenJDK to run the built application
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/Movies-0.0.1-SNAPSHOT.jar Movies.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "Movies.jar"]
