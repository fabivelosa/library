INSERT INTO library.users(user_id, first_name, last_name, category) VALUES (1, 'Will', 'Smith', 'STAFF');
INSERT INTO library.users(user_id, first_name, last_name, category) VALUES (2, 'Brad', 'Pitt', 'MANAGER');
INSERT INTO library.users(user_id, first_name, last_name, category) VALUES (3, 'Angelina', 'Jolie', 'CUSTOMER');

INSERT INTO library.authentication(username, password, user_id) VALUES('staff', '12345', 1);
INSERT INTO library.authentication(username, password, user_id) VALUES('manager', '12345', 2);
INSERT INTO library.authentication(username, password, user_id) VALUES('customer', '12345', 3);
