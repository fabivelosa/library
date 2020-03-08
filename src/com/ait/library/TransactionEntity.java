package com.ait.library;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class TransactionEntity {

	/**
	 * Created by paulmbarry on 010320.
	 */

	private int transaction_id;

	private Date date;

	private String name;

	private String type;

	private float amount;

	private int user_id;

	private float user_ob;
	
	private float user_cb;


	private Date createdAt;
	private Date updatedAt;

	public TransactionEntity() {
	}

	public TransactionEntity(int transaction_id) {
		this.transaction_id = transaction_id;
	}


	public int getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(int transaction_id) {
		this.transaction_id = transaction_id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}


	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public float getUser_ob() {
		return user_ob;
	}

	public void setUser_ob(float user_ob) {
		this.user_ob = user_ob;
	}
	

	public float getUser_cb() {
		return user_cb;
	}

	public void setUser_cb(float user_cb) {
		this.user_cb = user_cb;
	}
	

	// Logging Fields only//
	

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

}
