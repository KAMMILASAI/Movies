# Use an official Maven image to build the application
FROM maven:3.8.7-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy the POM file and dependency files first (to leverage Docker caching)
COPY pom.xml ./
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JDK for the final image
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
