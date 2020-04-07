package com.ait.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import com.ait.rsc.DataBaseConnection;

public class TimetableDao {

	enum DAYS {
		MON, TUE, WED, THU, FRI
	}

	public Map<String, String[]> findAll() {
		Map<String, String[]> map = new HashMap<String, String[]>();
		Connection c = null;
		String sql = "SELECT c.class_title, t.class_day, t.class_time FROM classes AS c"
				+ " INNER JOIN timetable AS t ON c.class_id = t.class_id";
		try {
			c = DataBaseConnection.getConnection();
			Statement s = c.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while (rs.next()) {
				String classTitle = rs.getString("class_title");
				String classDay = rs.getString("class_day");
				String classTime = rs.getString("class_time");

				DAYS day = DAYS.valueOf(classDay);
				String[] days;
				if (map.containsKey(classTitle)) {
					days = map.get(classTitle);
				} else {
					days = new String[5];
				}
				days[day.ordinal()] = classTime;
				map.put(classTitle, days);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return map;
	}
}
