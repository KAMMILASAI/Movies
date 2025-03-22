# Use official Maven image to build the application
FROM maven:3.9.5-eclipse-temurin-21 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy necessary files and build the application
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY . .
RUN mvn clean package -DskipTests

# Use a lightweight JDK image to run the built JAR
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the built JAR file
COPY --from=builder /app/target/Movies-0.0.1-SNAPSHOT.jar app.jar

# Expose the application's port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
