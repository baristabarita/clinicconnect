# Clinic Connect

A clinic reservation system built with Angular 18 and Spring Boot 3.4.

## Contributed by
- Ma. Keisha Atiga
- Shane Louis A. Barita
- Mark David Calzada
- Cindy Lepatan
- Lyan Jover
- Lance Justin Ramos

## Project Structure
```
clinic-connect/
├── client/ # Angular Frontend
│ ├── src/
│ │ ├── app/
│ │ │ ├── features/ # Feature modules
│ │ │ │ ├── auth/
│ │ │ │ ├── home/
│ │ │ │ ├── patients/
│ │ │ │ └── staff/
│ │ │ ├── layouts/ # Page layouts
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
- IntelliJ IDEA (recommended for backend development)
- MySQL Workbench (recommended for database management)

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

1. Navigate to the api directory:

```
cd api
``` 

2. Create a MySQL database named `clinic_db` with the `schema.sql` file found in: `api/src/main/resources/schema.sql`

3. Configure database connection in `api/src/main/resources/application.properties`:
```
spring.application.name=api
spring.datasource.url=jdbc:mysql://localhost:3306/clinic_db
spring.datasource.username=enter username here
spring.datasource.password=enter password here
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
jwt.secret=b7eadc8f234e4c8d9b12a345c6789d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6
```

4. Wait for Maven to download dependencies Build the project:

```
NOTE: You must have modified your configuration to run spring-boot:run in maven.
```

5. Run the application:

```
mvn spring-boot:run
```

OR

```
Click on the run button in IntelliJ IDEA
```

The backend side of the application will be available at `http://localhost:8080`  

## Features

### Core Features
- **Authentication & Authorization**: Secure login and registration system with role-based access control (Patient/Staff)
- **Advanced Search**: Real-time search functionality across appointments, doctors, and patient records
- **Responsive Design**: Fully responsive interface optimized for desktop and mobile devices

### Major Features

1. **Appointment Booking System**
   - Schedule new appointments with preferred doctors
   - Select available time slots
   - Specify appointment purpose and details
   - Receive confirmation notifications

2. **Appointment Management**
   - View and track appointment status
   - Filter appointments by date, status, and doctor
   - Update appointment details
   - Cancel or reschedule appointments

3. **Doctor Records Management**
   - Add and manage doctor profiles
   - Track doctor specialties and availability
   - Update doctor status and information
   - View doctor schedules and appointments

4. **Calendar Overview (Staff)**
   - Interactive calendar interface
   - View doctor availability and schedules
   - Color-coded appointment status
   - Easy appointment tracking

5. **Analytics Dashboard (Staff)**
   - Real-time statistics and metrics
   - Appointment distribution charts
   - Monthly appointment trends
   - Status-based analytics


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
- Chart.js for analytics

### Backend
- Spring Boot 3.4
- Spring Security
- Spring Data JPA
- MySQL
- Maven
