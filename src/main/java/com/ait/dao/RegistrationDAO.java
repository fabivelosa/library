package com.ait.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.ait.dto.RegistrationDTO;
import com.ait.rsc.DataBaseConnection;

public class RegistrationDAO {

	public List<RegistrationDTO> findAll() {
		List<RegistrationDTO> list = new ArrayList<RegistrationDTO>();
		Connection c = null;
		String sql = "SELECT * FROM library.registration ORDER BY regDate desc";
		System.out.println(sql);
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

	public List<RegistrationDTO> findByUserIdAndClassId(int userId, int classId ) {
		List<RegistrationDTO> list = new ArrayList<RegistrationDTO>();
		Connection c = null;
		String sql = "SELECT * FROM library.registration where classId = " + classId + " OR memberId = " + userId +" ORDER BY regDate desc";
		System.out.println(sql);
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

	protected RegistrationDTO processRow(ResultSet rs) throws SQLException {
		RegistrationDTO registration = new RegistrationDTO();
		registration.setRegistrationId((rs.getInt("registrationId")));
		registration.setClassId((rs.getInt("classId")));
		registration.setMemberId((rs.getInt("memberId")));
		registration.setRegDate((rs.getDate("regDate")));
		registration.setFeeDue((rs.getDouble("feeDue")));
		registration.setBalanceDue((rs.getDouble("balanceDue")));
		return registration;
	}

	public RegistrationDTO create(RegistrationDTO registration) {
		Connection c = null;
		String sql = null;
		try {
			c = DataBaseConnection.getConnection();
			sql = "INSERT INTO library.registration (classId, memberId, regDate, feeDue, balanceDue ) " +
			"VALUES (?,?,?,?,?);";
			PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setInt(1, registration.getClassId());
			ps.setInt(2, registration.getMemberId());
			ps.setDate(3, new java.sql.Date(registration.getRegDate().getTime()));
			ps.setDouble(4, registration.getFeeDue());
			ps.setDouble(5, registration.getBalanceDue());
			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			int id = rs.getInt(1);
			registration.setRegistrationId(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		System.out.println(sql + "id= " + registration.getRegistrationId());
		return registration;
	}

	public boolean remove(int id) {
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement("DELETE FROM library.registration WHERE registrationId=?; ");
			ps.setInt(1, id);
			int count = ps.executeUpdate();
			return count == 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
	}

}
