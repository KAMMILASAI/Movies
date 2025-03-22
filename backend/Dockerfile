FROM eclipse-temurin:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the built Spring Boot JAR file to the container
COPY target/*.jar app.jar

# Expose the application port (change if needed)
EXPOSE 8080

# Define the command to run the application
CMD ["java", "-jar", "app.jar"]
