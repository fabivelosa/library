--
-- data for table users
--
INSERT INTO library.users(user_id, first_name, last_name, category, birth_date) VALUES (1, 'Will', 'Smith', 'STAFF','1970-02-07'),
																		   (2, 'Brad', 'Pitt', 'MANAGER','1980-07-07'),
																		   (3, 'Angelina', 'Jolie', 'CUSTOMER','1990-04-09');
INSERT INTO library.users VALUES (4,'Peter','Jameson', '2013-03-01', 'Ard Blathna', 'Ard', 'Athlone','Westmeath','H45B435',0086538523,087653422,NULL,					'STAFF', 'AIT', 0.0, now(),null),
								 (5,'Mary','Walsh',		'2005-03-01','Sany view',	'Sany',	'Ballinasloe','Galway','U43563',0038859322,093847532,'marywalsh@gmail.com',	'STAFF',null, 0.0,'2020-03-01 20:07:23',NULL);

--
-- data for table authentication
--
INSERT INTO library.authentication(username, password, user_id) VALUES('staff', '12345', 1);
INSERT INTO library.authentication(username, password, user_id) VALUES('manager', '12345', 2);
INSERT INTO library.authentication(username, password, user_id) VALUES('customer', '12345', 3);

--
-- data for table transactions
--
INSERT INTO transactions VALUES (1,'2020-03-08 19:13:01','Membership','DEBIT',50,2,0,50),(2,'2020-03-08 19:13:46','Class Registration','DEBIT',30,2,50,80);

--
-- data for table membership
--
INSERT INTO library.membership(userId, startDate, endDate ) VALUES (3, '2021-03-10', '2021-03-10'),
																   (4, '2021-03-09', '2021-03-09');

--
-- data for table classes
--
INSERT INTO library.classes(class_Id,class_title,class_category,class_slot,class_fee,class_start,class_duration ) VALUES (1, 'Story time for kids','Children',40,5,'2021-02-10',60),
																														(2, 'English literature for beginners ','Adults',30,10,'2021-02-10',60),
																														(3, 'Creative writing for beginners', 'Adults', 30, 15, '2020-05-18', 60),
																														(4, 'Computers for beginners', 'Children', 30, 20, '2020-07-11', 60),
																														(5, 'Technology for the over 60s', 'Adults', 20, 5, '2020-09-08', 60),
                                                                                                                        (6, 'The Art of Drawing for kids', 'Children', 40, 10, '2020-06-12', 60),
                                                                                                                        (7, 'Photography for passionates', 'Adults', 30, 15, '2021-07-13', 60),
                                                                                                                        (8, 'Music time for adults', 'Adults', 40, 20, '2021-03-22', 60),
                                                                                                                        (9, 'Animation and Design', 'Adults', 30, 25, '2020-02-17', 60),
                                                                                                                        (10, 'Public speaking', 'Adults', 40, 30, '2020-11-02', 60),
                                                                                                                        (11, 'French for kids', 'Children', 30, 15,'2020-10-06', 60),
                                                                                                                        (12, 'German for adults', 'Adults', 30,20, '2020-04-05', 60),
                                                                                                                        (13, 'Italian for kids', 'Children', 30, 20, '2021-01-09', 60);

--
-- data for table registration
--
INSERT INTO library.registration(classId,memberId,regDate,feeDue,balanceDue,attendance ) VALUES (1, 3, '2021-03-10',5,45,1),
																								(2, 3, '2021-03-10',10,35,1);
