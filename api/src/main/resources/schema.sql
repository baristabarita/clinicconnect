CREATE SCHEMA `clinic_db` ;

-- Check if table exists and drop if needed
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    userid BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    mname VARCHAR(100),
    user_type VARCHAR(20) NOT NULL,
    contact VARCHAR(20),
    birthday DATE,
    age INT,
    gender VARCHAR(10),
    profile_image_path VARCHAR(255),
    profile_image_updated_at TIMESTAMP
);

-- Insert test user for development
INSERT INTO users (email, password, fname, lname, user_type) 
VALUES ('test@example.com', '$2a$10$YourHashedPasswordHere', 'Test', 'User', 'STAFF');

-- Create Doctors table
CREATE TABLE doctors (
    doctorID INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    mname VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    specialty VARCHAR(100),
    status VARCHAR(20) NOT NULL,
    profileImagePath VARCHAR(255) DEFAULT 'https://imgur.com/QQTJIpn.jpg',
    profileImageUpdatedAt TIMESTAMP
);

-- Create Doctor Availability Table
CREATE TABLE doctor_availability (
    availabilityID INT AUTO_INCREMENT PRIMARY KEY,
    doctorID INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    availability_type ENUM('AVAILABLE', 'ON_LEAVE', 'PARTIALLY_AVAILABLE') NOT NULL,
    notes TEXT DEFAULT NULL,
    FOREIGN KEY (doctorID) REFERENCES doctors(doctorID)
);

-- Create Appointments table
CREATE TABLE appointment (
    aptID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    doctorID INT NOT NULL,
    visitDate DATE NOT NULL,
    visitTime TIME NOT NULL,
    purpose TEXT,
    status enum('SCHEDULED','CONFIRMED','CANCELED','COMPLETED','RESCHEDULED') NOT NULL,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (doctorID) REFERENCES doctors(doctorID)
);

-- Create Notifications table
CREATE TABLE notifications (
    notifID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    appointmentID INT NOT NULL,
    content TEXT,
    isRead BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (userID) REFERENCES users(userID),
    FOREIGN KEY (appointmentID) REFERENCES appointment(aptID)
);