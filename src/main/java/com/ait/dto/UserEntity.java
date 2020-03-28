package com.ait.dto;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class UserEntity {

	/**
	 * Created by paulmbarry on 010320.
	 */

	private int user_id;
	
	private String category;

	private String first_name;

	private String last_name;
	
	private Date birth_date;

	private String age_group;

	private String address_name;

	private String address_street;

	private String address_town;

	private String address_county;

	private String eircode;

	private int land_tel;

	private int mobile_tel;

	private String email;
	
	private String college_name;

	private float account_balance;
	
	private Date createdAt;
	private Date updatedAt;

	public UserEntity() {
	}

	public UserEntity(int user_id) {
		this.user_id = user_id;
	}
//Getters and Setters
	


	public int getUserId() {
		return user_id;
	}

	public void setUserId(int user_id) {
		this.user_id = user_id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
	
	public String getFirstname() {
		return first_name;
	}

	public void setFirstname(String first_name) {
		this.first_name = first_name;
	}

	public String getLastname() {
		return last_name;
	}

	public void setLastname(String last_name) {
		this.last_name = last_name;
	}

	public Date getBirth_date() {
		return birth_date;
	}

	public void setBirth_date(Date birth_date) {
		this.birth_date = birth_date;
	}

	public String getAgeGroup() {
		return age_group;
	}

	public void setAgeGroup(String age_group) {
		this.age_group = age_group;
	}

	public String getAddressName() {
		return address_name;
	}

	public void setAddressName(String address_name) {
		this.address_name = address_name;
	}

	public String getAddressStreet() {
		return address_street;
	}

	public void setAddressStreet(String address_street) {
		this.address_street = address_street;
	}

	public String getAddressTown() {
		return address_town;
	}

	public void setAddressTown(String address_town) {
		this.address_town = address_town;
	}

	public String getAddressCounty() {
		return address_county;
	}

	public void setAddressCounty(String address_county) {
		this.address_county = address_county;
	}

	public String getEircode() {
		return eircode;
	}

	public void setEircode(String eircode) {
		this.eircode = eircode;
	}

	public int getLandTel() {
		return land_tel;
	}

	public void setLandTel(int land_tel) {
		this.land_tel = land_tel;
	}

	public int getMobileTel() {
		return mobile_tel;
	}

	public void setMobileTel(int mobile_tel) {
		this.mobile_tel = mobile_tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	// Logging Fields only//

	public String getCollege_name() {
		return college_name;
	}

	public void setCollege_name(String college_name) {
		this.college_name = college_name;
	}

	public float getAccount_balance() {
		return account_balance;
	}

	public void setAccount_balance(float account_balance) {
		this.account_balance = account_balance;
	}

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
