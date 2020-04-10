package com.ait.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.ait.dto.ClassesDTO;
import com.ait.rsc.DataBaseConnection;

public class AttendanceDAO {

	
	public List<ClassesDTO> findAttendancebyClass() {
		List<ClassesDTO> list = new ArrayList<ClassesDTO>();
		Connection c = null;
		String sql = "SELECT  c.class_id, c.class_title, class_category, c.Class_fee, c.picture, count(r.attendance) attendance\n" + 
				"FROM library.registration r \n" + 
				"inner join classes c\n" + 
				"ON c.class_id = r.classId \n" + 
				"group by c.class_id;";
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
	
	protected ClassesDTO processRow(ResultSet rs) throws SQLException {
		ClassesDTO classesDTO = new ClassesDTO();
		classesDTO.setClass_id(rs.getInt("class_id"));
		classesDTO.setClass_title(rs.getString("class_title"));
		classesDTO.setClass_category(rs.getString("class_category"));
		classesDTO.setClass_fee(rs.getString("class_fee"));
		classesDTO.setAttendance(rs.getInt("attendance"));
				classesDTO.setPicture(rs.getString("picture"));
		return classesDTO;
	}
}
