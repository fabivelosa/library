package com.ait.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.ait.dto.ClassesDTO;
import com.ait.rsc.DataBaseConnection;

public class ClassesDAO {

	public List<ClassesDTO> findAll() {
		List<ClassesDTO> list = new ArrayList<ClassesDTO>();
		Connection c = null;
		String sql = "SELECT * FROM classes ORDER BY class_id";
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

	public List<ClassesDTO> findAllByRegisterStatus(int memberId) {
		List<ClassesDTO> list = new ArrayList<ClassesDTO>();
		Connection c = null;
		String sql = "SELECT c.*, r.registrationId FROM classes as c "
				+ " LEFT JOIN registration as r ON c.class_id=r.classId AND r.memberId = ? "
				+ " ORDER BY r.registrationId DESC";
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, memberId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				ClassesDTO classDTO = processRow(rs);
				classDTO.setRegistrationId(rs.getInt("registrationId"));
				list.add(classDTO);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return list;
	}

	protected ClassesDTO processRow(ResultSet rs) throws SQLException {
		ClassesDTO classesDTO = new ClassesDTO();
		classesDTO.setClass_id(rs.getInt("class_id"));
		classesDTO.setClass_title(rs.getString("class_title"));
		classesDTO.setClass_category(rs.getString("class_category"));
		classesDTO.setClass_slot(rs.getString("class_slot"));
		classesDTO.setClass_fee(rs.getString("class_fee"));
		classesDTO.setClass_start(rs.getString("class_start"));
		classesDTO.setClass_duration(rs.getInt("class_duration"));
		return classesDTO;
	}

	public ClassesDTO findById(int id) {
		ClassesDTO dto = null;
		String sql = "SELECT * FROM classes WHERE class_id = ?";
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				dto = (processRow(rs));
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return dto;
	}

	public List<ClassesDTO> findByName(String name) {
		List<ClassesDTO> list = new ArrayList<ClassesDTO>();
		Connection c = null;
		String sql = "SELECT * FROM classes as e " + "WHERE UPPER(make) LIKE ? " + "ORDER BY make";
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, "%" + name.toUpperCase() + "%");
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

	public List<ClassesDTO> findByTitleAndCategory(String Class_title, String Class_category) {
		List<ClassesDTO> list = new ArrayList<ClassesDTO>();
		Connection c = null;
		String sql = "SELECT * FROM classes as e " + "WHERE UPPER(class_title) LIKE ? "
				+ "AND UPPER(class_category) LIKE ? " + "ORDER BY class_title";
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, "%" + Class_title.toUpperCase() + "%");
			ps.setString(2, "%" + Class_title.toUpperCase() + "%");
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

	public ClassesDTO create(ClassesDTO classesDTO) {
		Connection c = null;
		PreparedStatement ps = null;
		try {
			c = DataBaseConnection.getConnection();
			ps = c.prepareStatement("INSERT INTO classes"
					+ "(class_id, class_title, class_category, class_slot, class_fee, class_start, class_duration)"
					+ "VALUES (?, ?, ?, ?,?,?,?)", new String[] { "ID" });
			ps.setInt(1, classesDTO.getClass_id());
			ps.setString(2, classesDTO.getClass_title());
			ps.setString(3, classesDTO.getClass_category());
			ps.setString(4, classesDTO.getClass_slot());
			ps.setString(5, classesDTO.getClass_fee());
			ps.setString(6, classesDTO.getClass_start());
			ps.setInt(7, classesDTO.getClass_duration());
			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			int id = rs.getInt(1);
			classesDTO.setClass_id(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return classesDTO;
	}

	public ClassesDTO update(ClassesDTO classesDTO) {
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(
					"UPDATE classes SET Class_title = ?, Class_category = ?, Class_slot = ?, Class_fee = ?, "
							+ " Class_start = ?, Class_duration = ? WHERE Class_id = ?");
			ps.setString(1, classesDTO.getClass_title());
			ps.setString(2, classesDTO.getClass_category());
			ps.setString(3, classesDTO.getClass_slot());
			ps.setString(4, classesDTO.getClass_fee());
			ps.setString(5, classesDTO.getClass_start());
			ps.setInt(6, classesDTO.getClass_duration());
			ps.setInt(7, classesDTO.getClass_id());
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return classesDTO;
	}

	public boolean remove(int id) {
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement("DELETE FROM classes WHERE class_id=?");
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
