package com.ait.library;

/**
 * AbstractDAO.java This DAO class provemployee_ides CRUD database operations for the
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
import java.util.List;

public class EmployeeDAO {

	public EmployeeDAO() {
	}

	public List<EmployeeEntity> findAll() {
		List<EmployeeEntity> list = new ArrayList<EmployeeEntity>();
		Connection c = null;
		String sql = "SELECT * FROM employees ORDER BY last_name";
		try {
			c = ConnectionHelper.getConnection();
			Statement s = c.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while (rs.next()) {
				list.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return list;
	}

	public List<EmployeeEntity> findByName(String last_name) {
		List<EmployeeEntity> list = new ArrayList<EmployeeEntity>();
		Connection c = null;
		String sql = "SELECT * FROM employees as e " + "WHERE UPPER(last_name) LIKE ? " + "ORDER BY last_name";
		try {
			c = ConnectionHelper.getConnection();
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
			ConnectionHelper.close(c);
		}
		return list;
	}

	public EmployeeEntity findById(int employee_id) {
		String sql = "SELECT * FROM employees WHERE employee_id = ?";
		EmployeeEntity employee = null;
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, employee_id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				employee = processRow(rs);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return employee;
	}

	



	public EmployeeEntity create(EmployeeEntity employee) {
		Connection c = null;
		PreparedStatement ps = null;
		try {
			c = ConnectionHelper.getConnection();
			ps = c.prepareStatement(
					"INSERT INTO employees (first_name, last_name, job_title, address_name, address_street, address_town, address_county, eircode, land_tel, mobile_tel, email ) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
					new String[] { "ID" });

			ps.setString(1, employee.getFirstname());
			ps.setString(2, employee.getLastname());
			
			ps.setString(3, employee.getJobTitle());

			ps.setString(4, employee.getAddressName());
			ps.setString(5, employee.getAddressStreet());
			ps.setString(6, employee.getAddressTown());
			ps.setString(7, employee.getAddressCounty());
			ps.setString(8, employee.getEircode());
			
		
			ps.setInt(9, employee.getLandTel());
			ps.setInt(10, employee.getMobileTel());
			
			ps.setString(11, employee.getEmail());


			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			// Update the employee_id in the returned object. This is important as this value must be
			// returned to the client.
			int employee_id = rs.getInt(1);
			employee.setEmployeeId(employee_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return employee;
	}



	public EmployeeEntity updateEmployeeById(EmployeeEntity employee, Integer employee_id) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(
					"UPDATE employees SET first_name=?, last_name=?, job_title=?, address_name=?, address_street=?, address_town=?, address_county=?, eircode=?, land_tel=?, mobile_tel=?, email=? WHERE employee_id=?");

		

			ps.setString(1, employee.getFirstname());
			ps.setString(2, employee.getLastname());
			
			ps.setString(3, employee.getJobTitle());

			ps.setString(4, employee.getAddressName());
			ps.setString(5, employee.getAddressStreet());
			ps.setString(6, employee.getAddressTown());
			ps.setString(7, employee.getAddressCounty());
			ps.setString(8, employee.getEircode());
			
		
			ps.setInt(9, employee.getLandTel());
			ps.setInt(10, employee.getMobileTel());
			
			ps.setString(11, employee.getEmail());

			ps.setInt(12, employee_id);
				
			ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return employee;
	}

	public boolean delete(int employee_id) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement("DELETE FROM employees WHERE employee_id=?");
			ps.setInt(1, employee_id);
			int count = ps.executeUpdate();
			return count == 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
	}

	protected EmployeeEntity processRow(ResultSet rs) throws SQLException {
		EmployeeEntity employee = new EmployeeEntity();

		employee.setEmployeeId(rs.getInt("employee_id"));
		employee.setFirstname(rs.getString("first_name"));
		employee.setLastname(rs.getString("last_name"));
		employee.setJobTitle(rs.getString("job_title"));
		employee.setAddressName(rs.getString("address_name"));
		employee.setAddressStreet(rs.getString("address_street"));
		employee.setAddressTown(rs.getString("address_town"));
		employee.setAddressCounty(rs.getString("address_county"));
		employee.setEircode(rs.getString("eircode"));
		employee.setLandTel(rs.getInt("land_tel"));
		employee.setMobileTel(rs.getInt("mobile_tel"));
		employee.setEmail(rs.getString("email"));
		return employee;
	}


}