package com.ait.library.member;

/**
 * AbstractDAO.java This DAO class provides CRUD database operations for the Members
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

import com.ait.library.ConnectionHelper;

public class MemberDAO {

	public MemberDAO() {
	}

	public List<MemberEntity> findAll() {
		List<MemberEntity> list = new ArrayList<MemberEntity>();
		Connection c = null;
		String sql = "SELECT * FROM members ORDER BY last_name";
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

	public List<MemberEntity> findByName(String last_name) {
		List<MemberEntity> list = new ArrayList<MemberEntity>();
		Connection c = null;
		String sql = "SELECT * FROM members as e " + "WHERE UPPER(last_name) LIKE ? " + "ORDER BY last_name";
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

	public MemberEntity findById(int member_id) {
		String sql = "SELECT * FROM members WHERE member_id = ?";
		MemberEntity member = null;
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, member_id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				member = processRow(rs);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return member;
	}

	



	public MemberEntity create(MemberEntity member) {
		Connection c = null;
		PreparedStatement ps = null;
		try {
			c = ConnectionHelper.getConnection();
			ps = c.prepareStatement(
					"INSERT INTO members (first_name, last_name, age_group, address_name, address_street, address_town, address_county, eircode, land_tel, mobile_tel, email ) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
					new String[] { "ID" });

			ps.setString(1, member.getFirstname());
			ps.setString(2, member.getLastname());
			
			ps.setString(3, member.getAgeGroup());

			ps.setString(4, member.getAddressName());
			ps.setString(5, member.getAddressStreet());
			ps.setString(6, member.getAddressTown());
			ps.setString(7, member.getAddressCounty());
			ps.setString(8, member.getEircode());
			
		
			ps.setInt(9, member.getLandTel());
			ps.setInt(10, member.getMobileTel());
			
			ps.setString(11, member.getEmail());


			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			// Update the member_id in the returned object. This is important as this value must be
			// returned to the client.
			int member_id = rs.getInt(1);
			member.setMemberId(member_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return member;
	}



	public MemberEntity updateMemberById(MemberEntity member, Integer member_id) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(
					"UPDATE members SET first_name=?, last_name=?, age_group=?, address_name=?, address_street=?, address_town=?, address_county=?, eircode=?, land_tel=?, mobile_tel=?, email=? WHERE member_id=?");

		

			ps.setString(1, member.getFirstname());
			ps.setString(2, member.getLastname());
			
			ps.setString(3, member.getAgeGroup());

			ps.setString(4, member.getAddressName());
			ps.setString(5, member.getAddressStreet());
			ps.setString(6, member.getAddressTown());
			ps.setString(7, member.getAddressCounty());
			ps.setString(8, member.getEircode());
			
		
			ps.setInt(9, member.getLandTel());
			ps.setInt(10, member.getMobileTel());
			
			ps.setString(11, member.getEmail());

			ps.setInt(12, member_id);
				
			ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return member;
	}

	public boolean delete(int member_id) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement("DELETE FROM members WHERE member_id=?");
			ps.setInt(1, member_id);
			int count = ps.executeUpdate();
			return count == 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
	}

	protected MemberEntity processRow(ResultSet rs) throws SQLException {
		MemberEntity member = new MemberEntity();

		member.setMemberId(rs.getInt("member_id"));
		member.setFirstname(rs.getString("first_name"));
		member.setLastname(rs.getString("last_name"));
		member.setAgeGroup(rs.getString("age_group"));
		member.setAddressName(rs.getString("address_name"));
		member.setAddressStreet(rs.getString("address_street"));
		member.setAddressTown(rs.getString("address_town"));
		member.setAddressCounty(rs.getString("address_county"));
		member.setEircode(rs.getString("eircode"));
		member.setLandTel(rs.getInt("land_tel"));
		member.setMobileTel(rs.getInt("mobile_tel"));
		member.setEmail(rs.getString("email"));
		return member;
	}


}