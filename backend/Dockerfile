# Build Stage
FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app

# Copy only the pom.xml first to leverage Docker's caching mechanism
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the application
COPY . .  

# Ensure Maven runs inside the correct directory
RUN ls -la /app  # Debugging step to list files
RUN mvn clean package -DskipTests

# Run Stage
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/Movies-0.0.1-SNAPSHOT.jar Movies.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "Movies.jar"]
