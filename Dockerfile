# Этап 1: Сборка (используем Maven с новой версией Java)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
# Собираем jar, пропуская тесты
RUN mvn clean package -DskipTests

# Этап 2: Запуск (используем Eclipse Temurin JRE — это легковесная Java)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Копируем собранный файл
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]