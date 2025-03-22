FROM maven:3.9.5-openjdk-21 AS bulid
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
COPY --from=bulid /target/Movies-0.0.1-SNAPSHOT.jar Movies.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","Movies.jar" ]
