--
-- data for table users
--
INSERT INTO library.users(user_id, first_name, last_name, category) VALUES (1, 'Will', 'Smith', 'STAFF'),
																		   (2, 'Brad', 'Pitt', 'MANAGER'),
																		   (3, 'Angelina', 'Jolie', 'CUSTOMER');
INSERT INTO users VALUES (4,'Peter','Jameson','The Gables','Ard Blathna','Athlone','Westmeath','H45B435',0086538523,087653422,NULL,NULL,'STAFF',now(),null),
						 (5,'Mary','Walsh','The Sands','Sany view','Ballinasloe','Galway','U43563',0038859322,093847532,'marywalsh@gmail.com',NULL,'STAFF','2020-03-01 20:07:23',NULL);

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
																														(2, 'English literature for beginners ','Adults',30,10,'2021-02-10',60);

--
-- data for table registration
--
INSERT INTO library.registration(classId,memberId,regDate,feeDue,balanceDue,attendance ) VALUES (1, 3, '2021-03-10',5,45,1),
																								(2, 3, '2021-03-10',10,35,1);
