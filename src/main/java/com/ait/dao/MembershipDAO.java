package com.ait.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.ait.dto.MembershipDTO;
import com.ait.rsc.DataBaseConnection;

public class MembershipDAO {

	public List<MembershipDTO> findAll() {
		List<MembershipDTO> list = new ArrayList<MembershipDTO>();
		Connection c = null;
		String sql = "SELECT * FROM library.membership where endDate is null ORDER BY startDate desc";
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

	protected MembershipDTO processRow(ResultSet rs) throws SQLException {
		MembershipDTO membership = new MembershipDTO();
		membership.setMemberId((rs.getInt("memberId")));
		membership.setStartDate(rs.getDate("startDate"));
		membership.setEndDate(rs.getDate("endDate"));
		return membership;
	}

}
