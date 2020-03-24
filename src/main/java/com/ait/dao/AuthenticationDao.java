package com.ait.dao;

import com.ait.dto.AuthenticationInfo;
import com.ait.rsc.DataBaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AuthenticationDao {

	public AuthenticationInfo authenticate(String username, String password) {
		Connection connection = null;
		final String query = "SELECT u.category, u.user_id FROM authentication as a " +
								"INNER JOIN users AS u ON a.user_id=u.user_id " +
								"WHERE a.username=? AND a.password=?";
		try {
			connection = DataBaseConnection.getConnection();
			PreparedStatement ps = connection.prepareStatement(query);
			ps.setString(1, username);
			ps.setString(2, password);
			ResultSet resultSet = ps.executeQuery();
			if (resultSet.next()) {
				String userCategory = resultSet.getString("category");
				int userId = resultSet.getInt("user_id");
				return new AuthenticationInfo(userId, username, userCategory);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DataBaseConnection.close(connection);
		}
		return null;
	}
}
