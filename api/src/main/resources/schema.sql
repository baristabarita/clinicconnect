CREATE SCHEMA `clinic_db` ;

-- Create Users table
CREATE TABLE users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    mname VARCHAR(50),
    age INT,
    gender VARCHAR(20),
    contact VARCHAR(20),
    birthday DATE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(255) NOT NULL,
    profileImagePath VARCHAR(255) DEFAULT 'https://imgur.com/6UKAeTA.png',
    profileImageUpdatedAt TIMESTAMP
);

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

-- Create Appointments table
CREATE TABLE appointment (
    aptID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    doctorID INT NOT NULL,
    visitDate DATE NOT NULL,
    visitTime TIME NOT NULL,
    purpose TEXT,
    status VARCHAR(20) NOT NULL,
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