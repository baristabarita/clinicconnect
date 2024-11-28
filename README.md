# Clinic Connect

A clinic reservation system built with Angular 18 and Spring Boot 3.4.

## Project Structure
```
clinic-connect/
├── client/ # Angular Frontend
│ ├── src/
│ │ ├── app/
│ │ │ ├── core/ # Core functionality (WIP)
│ │ │ ├── features/ # Feature modules
│ │ │ │ ├── auth/
│ │ │ │ ├── home/
│ │ │ │ ├── patients/
│ │ │ │ └── staff/
│ │ │ ├── layouts/ # Page layouts
│ │ │ ├── modules/ # Angular modules (WIP)
│ │ │ └── shared/ # Shared components
│ │ ├── assets/
│ │ └── styles.css # Global styles (Tailwind CSS)
│ │
└── api/ # Spring Boot Backend
├── src/
│ ├── main/
│ │ ├── java/ # Java source files (WIP)
│ │ └── resources/
│ │ ├── application.properties
│ │ └── schema.sql
└── pom.xml

```

## Prerequisites

- Node.js (v18+)
- Java JDK 17
- MySQL 8.0+
- Maven

## Frontend Setup

1. Navigate to the client directory:

```
cd client   
```

2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run start
```

The frontend side of the application will be available at `http://localhost:4200`


## Backend Setup

1. Create a MySQL database named `clinic_db` with the `schema.sql` file found in .

2. Configure database connection in `api/src/main/resources/application.properties`:
```
spring.datasource.url=jdbc:mysql://localhost:3306/clinic_db
spring.datasource.username=root
spring.datasource.password=root
```

3. Navigate to the api directory:

```
cd api
``` 

4. Build the project:

```
mvn clean install
```

5. Run the application:

```
mvn spring-boot:run
```

The backend side of the application will be available at `http://localhost:8080`  

## Work in Progress (WIP)

### Frontend
- Core functionality (patient and staff features and services)
- State management implementation
- Complete feature modules


### Backend
- Controllers
- Services
- Repositories
- API documentation

## Available Scripts

### Frontend
- `npm start` - Starts development server
- `npm test` - Runs unit tests
- `npm run build` - Builds for production
- `npm run watch` - Builds in watch mode

### Backend
- `./mvnw clean` - Cleans the build
- `./mvnw test` - Runs unit tests
- `./mvnw package` - Creates JAR file
- `./mvnw spring-boot:run` - Runs the application

## Technologies Used

### Frontend
- Angular 18
- Tailwind CSS
- TypeScript

### Backend
- Spring Boot 3.4
- Spring Security
- Spring Data JPA
- MySQL
- Maven
- JUnit

