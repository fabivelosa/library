DROP DATABASE IF EXISTS library;
CREATE DATABASE IF NOT EXISTS library;

CREATE TABLE IF NOT EXISTS library.classes (
  class_id INT(11) NOT NULL AUTO_INCREMENT,
  class_title VARCHAR(45) NOT NULL,
  class_category VARCHAR(45) NULL DEFAULT NULL,
  class_slot VARCHAR(45) NULL DEFAULT NULL,
  class_fee VARCHAR(45) NULL DEFAULT NULL,
  class_start DATE NULL DEFAULT NULL,
  class_duration INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (class_id));
   
 CREATE TABLE IF NOT EXISTS library.users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  address_name VARCHAR(45) NULL DEFAULT NULL,
  address_street VARCHAR(45) NULL DEFAULT NULL,
  address_town VARCHAR(45) NULL DEFAULT NULL,
  address_county VARCHAR(45) NULL DEFAULT NULL,
  eircode VARCHAR(45) NULL DEFAULT NULL,
  land_tel INT(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  mobile_tel INT(9) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  email VARCHAR(45) NULL DEFAULT NULL,
  age_group ENUM('Standard', 'Discounted') NULL DEFAULT NULL COMMENT 'Enumerated to Standard or Discounted for Student or Senior Citizen',
  category ENUM('Staff', 'Manager', 'Walk-in customer', 'Customer') NULL DEFAULT NULL,
  PRIMARY KEY (user_id));

CREATE TABLE IF NOT EXISTS library.membership (
  memberId INT(11) NOT NULL AUTO_INCREMENT,
  startDate DATE NULL DEFAULT NULL,
  endDate DATE NULL DEFAULT NULL,
  PRIMARY KEY (memberId),
  CONSTRAINT userId
    FOREIGN KEY (memberId)
    REFERENCES library.users (user_id));
    
CREATE TABLE IF NOT EXISTS library.registration (
  registrationId INT(11) NOT NULL AUTO_INCREMENT,
  classId INT(11) NOT NULL,
  memberId INT(11) NOT NULL,
  regDate DATE NOT NULL,
  feeDue DECIMAL(2,0) NOT NULL COMMENT 'The calculated fee due for the particular member or non member',
  balanceDue DECIMAL(2,0) NOT NULL COMMENT 'The calculated balance due which is calculated after each payment is made.',
  attendance BOOLEAN NULL DEFAULT NULL,
  PRIMARY KEY (registrationId),
  INDEX fk_members_member_id_idx (memberId ASC) VISIBLE,
  INDEX fk_registrations_classes_class_id_idx (classId ASC) VISIBLE,
  CONSTRAINT fk_registrations_classes_class_id
    FOREIGN KEY (classId)
    REFERENCES library.classes (class_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_registrations_members_member_id
    FOREIGN KEY (memberId)
    REFERENCES library.users (user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

