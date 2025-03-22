# Use an official Maven image to build the application
FROM maven:3.8.7-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies (to improve caching)
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copy the entire project
COPY . .

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JDK for the final image
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
