FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# Собираем jar файл, пропуская тесты (чтобы быстрее)
RUN mvn clean package -DskipTests

# Этап 2: Запуск (используем легкий образ Java)
FROM openjdk:17-jdk-slim
WORKDIR /app
# Копируем собранный файл из первого этапа
# ВАЖНО: убедитесь, что имя файла совпадает с тем, что создает maven
# Обычно это target/имя-проекта-0.0.1-SNAPSHOT.jar
# Здесь мы берем любой jar файл из папки target
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]