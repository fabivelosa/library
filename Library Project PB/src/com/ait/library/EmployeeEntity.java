package com.ait.library;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class EmployeeEntity {

	/**
	 * Created by paulmbarry on 010320.
	 */

	private int employee_id;

	private String first_name;

	private String last_name;

	private String job_title;

	private String address_name;

	private String address_street;

	private String address_town;

	private String address_county;

	private String eircode;

	private int land_tel;

	private int mobile_tel;

	private String email;

	private Date createdAt;
	private Date updatedAt;

	public EmployeeEntity() {
	}

	public EmployeeEntity(int employee_id) {
		this.employee_id = employee_id;
	}

	public int getEmployeeId() {
		return employee_id;
	}

	public void setEmployeeId(int employee_id) {
		this.employee_id = employee_id;
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

	public String getJobTitle() {
		return job_title;
	}

	public void setJobTitle(String job_title) {
		this.job_title = job_title;
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
