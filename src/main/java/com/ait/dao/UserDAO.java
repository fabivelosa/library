package com.ait.dao;

/**
 * AbstractDAO.java This DAO class provides User CRUD database operations for the
 * table Library in the database.
 * 
 * @Model www.codejava.net
 *
 */

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.ait.dto.UserEntity;
import com.ait.rsc.DataBaseConnection;



public class UserDAO {

	public UserDAO() {
	}

	public List<UserEntity> findAll() {
		List<UserEntity> list = new ArrayList<UserEntity>();
		Connection c = null;
		String sql = "SELECT * FROM users ORDER BY last_name";
		try {
			c = DataBaseConnection.getConnection();
			Statement s = c.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while (rs.next()) {
				list.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return list;
	}

	public List<UserEntity> findByName(String last_name) {
		List<UserEntity> list = new ArrayList<UserEntity>();
		Connection c = null;
		String sql = "SELECT * FROM users as e " + "WHERE UPPER(last_name) LIKE ? " + "ORDER BY last_name";
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, "%" + last_name.toUpperCase() + "%");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				list.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return list;
	}

	public UserEntity findById(int user_id) {
		String sql = "SELECT * FROM users WHERE user_id = ?";
		UserEntity user = null;
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, user_id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				user = processRow(rs);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return user;
	}

	



	public UserEntity create(UserEntity user) {
		Connection c = null;
		PreparedStatement ps = null;
		try {
			c = DataBaseConnection.getConnection();
			ps = c.prepareStatement(
					"INSERT INTO users (category, first_name, last_name, birth_date, age_group, address_name, address_street, address_town, address_county, eircode, land_tel, mobile_tel, email, college_name, account_balance) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
					new String[] { "ID" });
			
			Date date = user.getBirth_date();
        	java.sql.Date sqlDate = convertJavaDateToSqlDate(date);
    		System.out.println("java.sql.Date : " + sqlDate);

			ps.setString(1, user.getCategory());
			ps.setString(2, user.getFirstname());
			ps.setString(3, user.getLastname());
			ps.setDate(4, sqlDate);
			ps.setString(5, user.getAgeGroup());
			ps.setString(6, user.getAddressName());
			ps.setString(7, user.getAddressStreet());
			ps.setString(8, user.getAddressTown());
			ps.setString(9, user.getAddressCounty());
			
			ps.setString(10, user.getEircode());
			ps.setInt(11, user.getLandTel());
			ps.setInt(12, user.getMobileTel());
			ps.setString(13, user.getEmail());
			
			ps.setString(14, user.getCollege_name());
			ps.setFloat(15, user.getAccount_balance());
		
		


			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			// Update the user_id in the returned object. This is important as this value must be
			// returned to the client.
			int user_id = rs.getInt(1);
			user.setUserId(user_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return user;
	}



	public UserEntity updateUserById(UserEntity user, Integer user_id) {
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(
					"UPDATE users SET category=?, first_name=?, last_name=?, birth_date=?, age_group=?, address_name=?, address_street=?, address_town=?, address_county=?, eircode=?, land_tel=?, mobile_tel=?, email=?, college_name=?, account_balance=? WHERE user_id=?");

			Date date = user.getBirth_date();
        	java.sql.Date sqlDate = convertJavaDateToSqlDate(date);
    		System.out.println("java.sql.Date : " + sqlDate);


		

			ps.setString(1, user.getCategory());
			ps.setString(2, user.getFirstname());
			ps.setString(3, user.getLastname());
			ps.setDate(4, sqlDate);
			ps.setString(5, user.getAgeGroup());
			ps.setString(6, user.getAddressName());
			ps.setString(7, user.getAddressStreet());
			ps.setString(8, user.getAddressTown());
			ps.setString(9, user.getAddressCounty());
			
			ps.setString(10, user.getEircode());
			ps.setInt(11, user.getLandTel());
			ps.setInt(12, user.getMobileTel());
			ps.setString(13, user.getEmail());
			
			ps.setString(14, user.getCollege_name());
			ps.setFloat(15, user.getAccount_balance());

			ps.setInt(16, user_id);
				
			ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return user;
	}

	public boolean delete(int user_id) {
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement("DELETE FROM users WHERE user_id=?");
			ps.setInt(1, user_id);
			int count = ps.executeUpdate();
			return count == 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
	}

	protected UserEntity processRow(ResultSet rs) throws SQLException {
		UserEntity user = new UserEntity();

		user.setUserId(rs.getInt("user_id"));
		user.setCategory(rs.getString("category"));
		user.setFirstname(rs.getString("first_name"));
		user.setLastname(rs.getString("last_name"));
		user.setBirth_date(rs.getDate("birth_date"));
		user.setAgeGroup(rs.getString("age_group"));
		user.setAddressName(rs.getString("address_name"));
		user.setAddressStreet(rs.getString("address_street"));
		user.setAddressTown(rs.getString("address_town"));
		user.setAddressCounty(rs.getString("address_county"));
		user.setEircode(rs.getString("eircode"));
		user.setLandTel(rs.getInt("land_tel"));
		user.setMobileTel(rs.getInt("mobile_tel"));
		user.setEmail(rs.getString("email"));
		user.setCollege_name(rs.getString("college_name"));
		user.setAccount_balance(rs.getFloat("account_balance"));
		return user;
	}
	
	public static java.sql.Date convertJavaDateToSqlDate(java.util.Date date)
	{
		// java.util.Date contains both date and time information
		// java.sql.Date contains only date information (without time)
		return new java.sql.Date(date.getTime());
	}

	public void updateUserBalanceById(Integer id, float account_balance) {
		// TODO Auto-generated method stub
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(
					"UPDATE users SET account_balance=? WHERE user_id=?");

			ps.setFloat(1, account_balance);

			ps.setInt(2, id);
				
			ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		
	
	}
	


}