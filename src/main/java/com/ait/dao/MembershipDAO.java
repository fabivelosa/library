package com.ait.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
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
		String sql = "SELECT * FROM library.membership where endDate > now() ORDER BY startDate desc";
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

	public MembershipDTO findById(int id) {
		String sql = "SELECT * FROM library.membership where userId = ?";
		System.out.println(sql);
		MembershipDTO membership = null;
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				membership = processRow(rs);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return membership;
	}

	protected MembershipDTO processRow(ResultSet rs) throws SQLException {
		MembershipDTO membership = new MembershipDTO();
		membership.setUserId((rs.getInt("userId")));
		membership.setStartDate(rs.getDate("startDate"));
		membership.setEndDate(rs.getDate("endDate"));
		return membership;
	}

	public MembershipDTO create(MembershipDTO membership) {
		Connection c = null;
		String sql = null;
		try {
			c = DataBaseConnection.getConnection();
			sql = "INSERT INTO library.membership ( userId, startDate, endDate ) " + "VALUES (?,?,?);";
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, membership.getUserId());
			ps.setDate(2, new java.sql.Date(membership.getStartDate().getTime()));
			ps.setDate(3, new java.sql.Date(membership.getEndDate().getTime()));
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		System.out.println(sql + "id= " + membership.getUserId());
		return membership;
	}

	public MembershipDTO update(MembershipDTO membership) {
		Connection c = null;
		try {
			c = DataBaseConnection.getConnection();
			PreparedStatement ps = c.prepareStatement("UPDATE library.membership set endDate =? WHERE Userid=?;");
			ps.setDate(1, new java.sql.Date(membership.getEndDate().getTime()));
			ps.setInt(2, membership.getUserId());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DataBaseConnection.close(c);
		}
		return membership;
	}

}
