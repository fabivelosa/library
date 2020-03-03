package com.ait.rsc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DataBaseConnection {

	private String url;
	private static DataBaseConnection instance;

	private DataBaseConnection() {
		String driver = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		//	Docker (database for tests) 
		//	url = "jdbc:mysql://127.0.0.1:3307/library?useSSL=false&allowPublicKeyRetrieval=true&user=root&password=admin123";
			url = "jdbc:mysql://127.0.0.1:3306/library?useSSL=false&allowPublicKeyRetrieval=true&user=root&password=admin123";
			driver = "com.mysql.cj.jdbc.Driver";
			Class.forName(driver);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Connection getConnection() throws SQLException {
		if (instance == null) {
			instance = new DataBaseConnection();
		}
		try {
			return DriverManager.getConnection(instance.url);
		} catch (SQLException e) {
			throw e;
		}
	}

	public static void close(Connection connection) {
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
