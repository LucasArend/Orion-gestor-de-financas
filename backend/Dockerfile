# Etapa de build com Maven + JDK 21
FROM maven:3.9.9-eclipse-temurin-21 AS build



WORKDIR /app

# Copia tudo do backend
COPY . /app

# Compila e empacota
RUN mvn package -DskipTests

# Etapa final: apenas JDK 21 para rodar a aplicação
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copia o .jar do build anterior
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
