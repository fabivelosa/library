DROP DATABASE IF EXISTS library;
CREATE DATABASE IF NOT EXISTS library;
Use library;
--
-- Table structure for table classes
--
DROP TABLE IF EXISTS classes;
CREATE TABLE IF NOT EXISTS library.classes (
  class_id INT(11) NOT NULL AUTO_INCREMENT,
  class_title VARCHAR(45) NOT NULL,
  class_category VARCHAR(45) NULL DEFAULT NULL,
  class_slot VARCHAR(45) NULL DEFAULT NULL,
  class_fee VARCHAR(45) NULL DEFAULT NULL,
  class_start DATE NULL DEFAULT NULL,
  class_duration INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (class_id));

--
-- Table structure for table users
--
DROP TABLE IF EXISTS users;
 CREATE TABLE IF NOT EXISTS library.users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  birth_date date DEFAULT NULL,
  address_name VARCHAR(45) NULL DEFAULT NULL,
  address_street VARCHAR(45) NULL DEFAULT NULL,
  address_town VARCHAR(45) NULL DEFAULT NULL,
  address_county VARCHAR(45) NULL DEFAULT NULL,
  eircode VARCHAR(45) NULL DEFAULT NULL,
  land_tel INT(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  mobile_tel INT(9) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  email VARCHAR(45) NULL DEFAULT NULL,
 # age_group ENUM('Standard', 'Discounted') NULL DEFAULT NULL COMMENT 'Enumerated to Standard or Discounted for Student or Senior Citizen',
  category ENUM('STAFF', 'MANAGER', 'WALK_IN_CUSTOMER', 'CUSTOMER') NOT NULL,
  college_name VARCHAR(45) DEFAULT NULL,
  account_balance decimal(6,2) DEFAULT '0',
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  modified_at datetime DEFAULT NULL,
  PRIMARY KEY (user_id));

--
-- Table structure for table membership
--
DROP TABLE IF EXISTS membership;

CREATE TABLE IF NOT EXISTS library.membership (
  userId INT(11) NOT NULL AUTO_INCREMENT,
  startDate DATE NOT NULL,
  endDate DATE NULL DEFAULT NULL,
  CONSTRAINT fk_members_users_member_id
    FOREIGN KEY (userId)
    REFERENCES library.users (user_id));

--
-- Table structure for table registration
--
DROP TABLE IF EXISTS registration;
CREATE TABLE IF NOT EXISTS library.registration (
  registrationId INT(11) NOT NULL AUTO_INCREMENT,
  classId INT(11) NOT NULL,
  memberId INT(11) NOT NULL,
  regDate DATE NOT NULL,
  feeDue DECIMAL(6,2) NOT NULL COMMENT 'The calculated fee due for the particular member or non member',
  balanceDue DECIMAL(6,2) NOT NULL COMMENT 'The calculated balance due which is calculated after each payment is made.',
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
--
-- Table structure for table authentication
--
DROP TABLE IF EXISTS authentication;
CREATE TABLE IF NOT EXISTS library.authentication (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  user_id INT(11) NOT NULL ,
  PRIMARY KEY (id),
  CONSTRAINT fk_authentication_users_user_id
    FOREIGN KEY (user_id)
    REFERENCES library.users (user_id));

--
-- Table structure for table transactions
--
DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  transaction_id int(11) NOT NULL AUTO_INCREMENT,
  date datetime DEFAULT CURRENT_TIMESTAMP,
  name varchar(45) DEFAULT NULL COMMENT 'Membership fee, Class registration, payment for class etc',
  type enum('DEBIT','CREDIT') DEFAULT NULL,
  amount float DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  user_ob float DEFAULT NULL,
  user_cb float DEFAULT NULL,
  PRIMARY KEY (transaction_id),
  KEY fk_transactions_users_user_id_idx (user_id),
  CONSTRAINT fk_transactions_users_user_id FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

--
-- Table structure for table timetable
--
DROP TABLE if exists timetable;

CREATE TABLE timetable (
id int(11) NOT NULL AUTO_INCREMENT,
class_day ENUM('MON', 'TUE', 'WED', 'THU', 'FRI') NOT NULL,
class_time VARCHAR(45) NOT NULL,
class_id INT(11) NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fk_timetable_classes_class_id
    FOREIGN KEY (class_id)
    REFERENCES library.classes (class_id)
);
