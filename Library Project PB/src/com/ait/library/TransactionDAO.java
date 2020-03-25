package com.ait.library;

/**
 * AbstractDAO.java This DAO class provides Transactions CRUD database operations for the
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

import com.ait.library.TransactionEntity;

public class TransactionDAO {

	public TransactionDAO() {
	}

	
	public List<TransactionEntity> findAll() {
		List<TransactionEntity> list = new ArrayList<TransactionEntity>();
		Connection c = null;
		String sql = "SELECT * FROM transactions ORDER BY date";
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

	/*Get all Transactions for a particular customer*/
	public List<TransactionEntity> findByCustomerId(int custId) {
		System.out.println("Inside find customer transactions by ID");
		List<TransactionEntity> list = new ArrayList<TransactionEntity>();
		Connection c = null;
		String sql = "SELECT * FROM transactions as e " + "WHERE user_id = ? " + "ORDER BY date";
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, custId);
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

	public TransactionEntity findById(int transaction_id) {
		String sql = "SELECT * FROM transactions WHERE transaction_id = ?";
		TransactionEntity transaction = null;
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, transaction_id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				transaction = processRow(rs);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return transaction;
	}

	



	public TransactionEntity create(TransactionEntity transaction) {
		Connection c = null;
		PreparedStatement ps = null;
		try {
			c = ConnectionHelper.getConnection();
			ps = c.prepareStatement(
					"INSERT INTO transactions (`name`,\n" + 
					"`type`,\n" + 
					"`amount`,\n" + 
					"`user_id`,\n" + 
					"`user_ob`,\n" + 
					"`user_cb` ) VALUES (?,?,?,?,?,?)",
					new String[] { "ID" });
			
			/*Date date = transaction.getDate();
        	java.sql.Date sqlDate = convertJavaDateToSqlDate(date);
    		System.out.println("java.sql.Date : " + sqlDate);*/

			/*ps.setDate(1, sqlDate);*/
			ps.setString(1, transaction.getName());
			
			ps.setString(2, transaction.getType());

			ps.setFloat(3, transaction.getAmount());
			ps.setInt(4, transaction.getUser_id());
			ps.setFloat(5, transaction.getUser_ob());
			ps.setFloat(6, transaction.getUser_cb());


			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			// Update the transaction_id in the returned object. This is important as this value must be
			// returned to the client.
			int transaction_id = rs.getInt(1);
			transaction.setTransaction_id(transaction_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return transaction;
	}



	public TransactionEntity updateTransactionById(TransactionEntity transaction, Integer transaction_id) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(
					"UPDATE transactions SET Date=?, name=?, type=?, amount=?, user_id=?, user_ob=?, user_cb=? WHERE transaction_id=?");

			Date date = transaction.getDate();
        	java.sql.Date sqlDate = convertJavaDateToSqlDate(date);
    		System.out.println("java.sql.Date : " + sqlDate);


	    	ps.setDate(1, sqlDate);
			ps.setString(2, transaction.getName());
			
			ps.setString(3, transaction.getType());

			ps.setFloat(4, transaction.getAmount());
			ps.setInt(5, transaction.getUser_id());
			ps.setFloat(6, transaction.getUser_ob());
			ps.setFloat(7, transaction.getUser_cb());

			ps.setInt(8, transaction_id);
				
			ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return transaction;
	}

	public boolean delete(int transaction_id) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement("DELETE FROM transactions WHERE transaction_id=?");
			ps.setInt(1, transaction_id);
			int count = ps.executeUpdate();
			return count == 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
	}

	protected TransactionEntity processRow(ResultSet rs) throws SQLException {
		TransactionEntity transaction = new TransactionEntity();

		transaction.setTransaction_id(rs.getInt("transaction_id"));
		transaction.setDate(rs.getDate("date"));
		transaction.setName(rs.getString("name"));
		transaction.setType(rs.getString("type"));
		transaction.setAmount(rs.getFloat("amount"));
		transaction.setUser_id(rs.getInt("user_id"));
		transaction.setUser_ob(rs.getFloat("user_ob"));
		transaction.setUser_cb(rs.getFloat("user_cb"));
	
		return transaction;
	}
	
	public static java.sql.Date convertJavaDateToSqlDate(java.util.Date date)
	{
		// java.util.Date contains both date and time information
		// java.sql.Date contains only date information (without time)
		return new java.sql.Date(date.getTime());
	}


}