CREATE SCHEMA `clinic_db` ;

USE `clinic_db`;

-- Create users table
CREATE TABLE `users` (
  userID int NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  fname varchar(255) NOT NULL,
  lname varchar(255) NOT NULL,
  mname varchar(255) DEFAULT NULL,
  age int DEFAULT NULL,
  gender varchar(255) DEFAULT NULL,
  contact varchar(255) DEFAULT NULL,
  birthday date DEFAULT NULL,
  password varchar(255) NOT NULL,
  user_type varchar(255) NOT NULL,
  profile_image_path varchar(255) DEFAULT 'https://imgur.com/6UKAeTA.png',
  profile_image_updated_at datetime(6) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`)
);

-- Create Doctors table
CREATE TABLE `doctors` (
  doctorID int NOT NULL AUTO_INCREMENT,
  fname varchar(255) NOT NULL,
  lname varchar(255) NOT NULL,
  mname varchar(255) DEFAULT NULL,
  email varchar(255) NOT NULL,
  specialty varchar(255) DEFAULT NULL,
  status varchar(255) NOT NULL,
  profile_image_path varchar(255) DEFAULT 'https://imgur.com/QQTJIpn.jpg',
  profile_image_updated_at datetime(6) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  PRIMARY KEY (`doctorID`),
  UNIQUE KEY `email` (`email`)
);

-- Create Doctor Availability Table
CREATE TABLE `doctor_availability` (
  availabilityID int NOT NULL AUTO_INCREMENT,
  doctorID int NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  availability_type enum('AVAILABLE','ON_LEAVE','PARTIALLY_AVAILABLE') NOT NULL,
  notes varchar(255) DEFAULT NULL,
  PRIMARY KEY (`availabilityID`),
  KEY `doctorID` (`doctorID`),
  CONSTRAINT `doctor_availability_ibfk_1` FOREIGN KEY (`doctorID`) REFERENCES `doctors` (`doctorID`)
);

-- Create Appointments table
CREATE TABLE `appointment` (
  aptid bigint NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  doctorID int NOT NULL,
  visit_date date NOT NULL,
  visit_time time NOT NULL,
  purpose varchar(255) NOT NULL,
  status enum('SCHEDULED','CONFIRMED','CANCELED','COMPLETED','RESCHEDULED') NOT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  PRIMARY KEY (`aptid`),
  KEY `userID` (`userID`),
  KEY `doctorID` (`doctorID`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`doctorID`) REFERENCES `doctors` (`doctorID`)
);

INSERT INTO `users` VALUES 
(1,'john.doe@example.com','John','Doe','A',30,'Male','1234567890','1993-05-15','$2a$10$cBhMYB1LlMyvSuCLYXVrf.6XYWjK1cJFAYiVicKEgW6a4zYKKCekG','PATIENT',NULL,NULL),
(2,'jane.doe@example.com','Jane','Doe','B',24,'female','1234567890','1993-05-15','$2a$10$SfZMJlqnW1Jk3RLrcbIEIeSHi/D8wO1/Hsbp1.069u261w.9bTSZe','PATIENT',NULL,NULL),
(3,'bob.doc@example.com','Bob','Bob','B',24,'male','1234567890','1993-05-15','$2a$10$rvYtLpliJ1AT87KQhj38ueAu4DYAMtrpzd0WGKHRieFqXzVhbK02e','STAFF',NULL,NULL),
(4,'mark.fish@example.com','Mark','Fish','P',30,'male','1234567890','1993-05-15','$2a$10$mYOUyDxtaQFuiNLQzNEdAe5MSZyU9yXrL4zYgqN6rMOWlGXTa0yse','STAFF',NULL,NULL),
(5,'michael.desanta@email.com','Michael','DeSanta','E',50,'MALE','09999999999','1994-12-03','$2a$10$5LG.0ZC/lAGR03Du6avSReP1S9VgRnY742m/hb9nsOl/m8ASt0w92','STAFF',NULL,NULL),
(6,'karylle.bernate@email.com','Karylle','Bernate','',23,'FEMALE','09123456789','2003-08-08','$2a$10$z6FytMZ4Wi2e48XP8dfZeOAmt2AeU7bsNswAVDk6YkLZr5CStTO/S','PATIENT',NULL,NULL),
(7,'shane@email.com','Shane','Dave','',23,'MALE','09156782341','2003-02-22','$2a$10$nRhtWKe6N6KzER5TBVS/aOU8FTnjPtN0SP1FFIbILFvxxYCFO4Fye','PATIENT',NULL,NULL),
(8,'mark.david@emai.com','Mark','David','',26,'MALE','09934528456','1995-10-17','$2a$10$ljmmQgCxlqRlK9QhP5S5N..q2QSYzi72HwflUekJL0xbzmpHDtNdq','PATIENT',NULL,NULL);

INSERT INTO `doctors` VALUES (1,'Bob','Martinez','','bb.doc@email.com','Surgeon','AVAILABLE','https://www.pngall.com/wp-content/uploads/2018/05/Doctor-PNG-File-Download-Free.png',NULL,0),
(2,'Sarah','Louis','','sarahlouis@gmail.com','Cardiologist','AVAILABLE','https://gregoryjhickenmd.com/wp-content/uploads/2018/04/Nurse-Clipboard-Dr-Hicken.png',NULL,0),
(9,'Marcus','Vasquez','','mc@doc.email.com','Cardiololigst','AVAILABLE','https://pngimg.com/d/doctor_PNG15992.png',NULL,0);

INSERT INTO `doctor_availability` VALUES 
(1,1,'2024-12-02','2024-12-18','AVAILABLE',NULL),
(2,1,'2024-12-24','2024-12-31','ON_LEAVE',NULL),
(6,1,'2024-01-01','2024-06-30','AVAILABLE','Regular clinic hours'),
(7,2,'2024-01-01','2024-06-30','AVAILABLE','Regular clinic hours'),
(8,1,'2024-02-14','2024-02-21','ON_LEAVE','Annual vacation'),
(9,2,'2024-03-10','2024-03-17','ON_LEAVE','Conference attendance'),
(10,1,'2024-04-01','2024-04-30','PARTIALLY_AVAILABLE','Afternoon sessions only'),
(11,2,'2024-05-15','2024-05-30','PARTIALLY_AVAILABLE','Morning sessions only');

INSERT INTO `appointment` VALUES (116,1,1,'2024-01-05','09:00:00','Annual Check-up','COMPLETED',0),(117,2,2,'2024-01-10','10:30:00','Fever and Cough','COMPLETED',0),(118,6,1,'2024-01-15','14:00:00','Vaccination','COMPLETED',0),(119,7,9,'2024-01-20','11:00:00','Blood Pressure Check','COMPLETED',0),(120,8,2,'2024-02-05','09:30:00','Diabetes Follow-up','COMPLETED',0),(121,6,1,'2024-02-10','13:00:00','Skin Consultation','CANCELED',0),(122,7,9,'2024-02-25','15:30:00','Headache Assessment','COMPLETED',0),(123,1,2,'2024-02-28','10:00:00','Follow-up Check','COMPLETED',0),(124,2,1,'2024-03-05','11:30:00','Respiratory Issues','COMPLETED',0),(125,7,2,'2024-03-20','14:30:00','Allergy Consultation','COMPLETED',0),(126,6,1,'2024-03-25','09:00:00','Regular Check-up','CANCELED',0),(127,1,9,'2024-03-30','16:00:00','Blood Test Results','COMPLETED',0),(128,6,2,'2024-04-05','10:00:00','Joint Pain','CONFIRMED',0),(129,7,1,'2024-04-10','13:30:00','Vaccination','COMPLETED',0),(130,1,9,'2024-04-15','15:00:00','Follow-up Check','CANCELED',0),(131,2,1,'2024-04-20','11:00:00','Chronic Condition Review','COMPLETED',0),(170,6,2,'2024-05-05','09:30:00','Annual Physical','COMPLETED',0),(171,7,1,'2024-05-10','14:00:00','Medication Review','COMPLETED',0),(172,8,9,'2024-05-15','10:30:00','Follow-up Consultation','SCHEDULED',0),(173,6,1,'2024-05-20','15:30:00','Lab Results Discussion','CONFIRMED',0),(174,7,2,'2024-06-05','11:00:00','General Consultation','COMPLETED',0),(175,1,1,'2024-06-10','13:00:00','Preventive Care','CONFIRMED',0),(176,2,9,'2024-06-15','09:00:00','Follow-up Check','RESCHEDULED',0),(177,6,1,'2024-06-20','14:30:00','Vaccination','COMPLETED',0),(298,1,2,'2024-08-05','09:00:00','Annual Physical','SCHEDULED',0),(330,7,1,'2024-08-07','10:30:00','Blood Pressure Check','RESCHEDULED',0),(331,6,2,'2024-08-12','14:00:00','Diabetes Management','COMPLETED',0),(332,7,1,'2024-08-15','11:00:00','Skin Condition','COMPLETED',0),(333,1,9,'2024-08-20','13:30:00','Follow-up Visit','CANCELED',0),(334,2,1,'2024-08-25','15:00:00','Vaccination','CONFIRMED',0),(335,8,2,'2024-09-03','09:30:00','Chronic Pain Management','COMPLETED',0),(336,1,1,'2024-09-08','11:00:00','Respiratory Check','COMPLETED',0),(337,2,2,'2024-09-12','14:30:00','Lab Results Review','COMPLETED',0),(338,6,1,'2024-09-17','10:00:00','Mental Health Check','COMPLETED',0),(339,7,2,'2024-09-22','13:00:00','Allergy Consultation','COMPLETED',0),(340,1,1,'2024-09-27','15:30:00','General Check-up','COMPLETED',0),(341,2,2,'2024-10-02','09:00:00','Flu Shot','COMPLETED',0),(342,8,1,'2024-10-07','10:30:00','Follow-up Care','COMPLETED',0),(343,7,2,'2024-10-11','14:00:00','Joint Pain Assessment','COMPLETED',0),(344,1,9,'2024-10-16','11:30:00','Medication Review','COMPLETED',0),(345,6,2,'2024-10-21','13:30:00','Preventive Care','COMPLETED',0),(346,7,1,'2024-10-25','15:00:00','Annual Wellness Visit','COMPLETED',0),(347,1,2,'2024-11-04','09:30:00','Blood Work Review','RESCHEDULED',0),(348,2,1,'2024-11-08','11:00:00','Vaccination Booster','COMPLETED',0),(349,6,2,'2024-11-13','14:30:00','Digestive Issues','COMPLETED',0),(350,7,9,'2024-11-18','10:00:00','Follow-up Check','CANCELED',0),(351,8,2,'2024-11-22','13:00:00','Chronic Condition Review','CANCELED',0),(352,1,1,'2024-11-27','15:30:00','General Consultation','CANCELED',0),(353,7,2,'2024-12-03','09:00:00','Year-end Check-up','COMPLETED',0),(354,1,1,'2024-12-06','10:30:00','Preventive Care','RESCHEDULED',0),(355,2,9,'2024-12-11','14:00:00','Follow-up Visit','CONFIRMED',0),(356,6,1,'2024-12-16','11:30:00','Medication Adjustment','CONFIRMED',0),(357,7,2,'2024-12-11','13:30:00','Lab Results Discussion','SCHEDULED',0),(358,8,1,'2024-12-11','15:00:00','Annual Review','SCHEDULED',0);