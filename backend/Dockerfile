# Multi-stage build for Spring Boot backend
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Build the application
RUN apk add --no-cache maven && \
    mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Set environment variables (override these at runtime)
ENV SPRING_PROFILES_ACTIVE=prod
ENV JWT_SECRET=""
ENV SPRING_DATASOURCE_URL=""
ENV SPRING_DATASOURCE_USERNAME=""
ENV SPRING_DATASOURCE_PASSWORD=""
ENV MAIL_USERNAME=""
ENV MAIL_PASSWORD=""

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
