# Stage 1: Build the Spring Boot application with Maven
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy pom.xml and cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and package executable jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimalist Lightweight Runtime Container
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Create non-root user for security
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring

# Copy built JAR from builder stage
COPY --from=builder /app/target/the-fitness-club-backend-1.0.0.jar app.jar

# Render dynamic port assignment
EXPOSE 8080
ENV PORT=8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
