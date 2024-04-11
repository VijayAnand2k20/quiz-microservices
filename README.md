# Microservices Based Quiz Application

This is a simple quiz application that is built using microservices architecture. The application is built using Spring Boot, spring cloud Eureka, Feign, and spring cloud gateway.

## Architecture

The application is built using microservices architecture. The application consists of the following services:

1. **Quiz Service**: This service is responsible for managing the quizzes. It provides APIs to create, get, submit quizzes.
2. **Question Service**: This service is responsible for managing the questions. It provides APIs to add and get questions, get score of submitted answers.
3. **Service Registry**: This service is responsible for registering the services. It uses Eureka for service registration.
4. **API Gateway**: This service is responsible for routing the requests to the appropriate services. It uses spring cloud gateway for routing.

## Running the application

To run the application, you need to have Java 11 installed on your machine. You can run the application using the following command:

```bash
./mvnw spring-boot:run
```

This will start the services on the following ports:

1. **Quiz Service**: 8090
2. **Question Service**: 8080
3. **Service Registry**: 8761
4. **API Gateway**: 8765

# Monolithic Version

The monolithic version of the application is the `quizapp` directory. The monolithic version of the application is built using Spring Boot.

Future Plans:

1. Adding a front end to the application.
2. Adding authentication and authorization to the application.