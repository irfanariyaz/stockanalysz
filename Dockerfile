# Use an official Maven or Gradle image to build the application
FROM maven:3.5.2-jdk-8-alpine  AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven or Gradle configuration files
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package

# Use a minimal Java runtime image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/Stocker-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]


#FROM openjdk:17-jdk-alpine
#ARG JAR_FILE=target/*.jar
#COPY ./target/Stocker-0.0.1-SNAPSHOT.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]