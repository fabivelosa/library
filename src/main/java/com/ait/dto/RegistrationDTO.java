package com.ait.dto;

import java.util.Date;

public class RegistrationDTO {

	private int registrationId;
	private int classId;
	private int memberId;
	private Date regDate;
	private double feeDue;
	private double balanceDue;
	private boolean attendance;

	/**
	 * @return the registrationId
	 */
	public int getRegistrationId() {
		return registrationId;
	}

	/**
	 * @param registrationId the registrationId to set
	 */
	public void setRegistrationId(int registrationId) {
		this.registrationId = registrationId;
	}

	/**
	 * @return the classId
	 */
	public int getClassId() {
		return classId;
	}

	/**
	 * @param classId the classId to set
	 */
	public void setClassId(int classId) {
		this.classId = classId;
	}

	/**
	 * @return the memberId
	 */
	public int getMemberId() {
		return memberId;
	}

	/**
	 * @param memberId the memberId to set
	 */
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}

	/**
	 * @return the date
	 */
	public Date getRegDate() {
		return regDate;
	}

	/**
	 * @param date the date to set
	 */
	public void setRegDate(Date date) {
		this.regDate = date;
	}

	/**
	 * @return the feeDue
	 */
	public double getFeeDue() {
		return feeDue;
	}

	/**
	 * @param feeDue the feeDue to set
	 */
	public void setFeeDue(double feeDue) {
		this.feeDue = feeDue;
	}

	/**
	 * @return the balanceDue
	 */
	public double getBalanceDue() {
		return balanceDue;
	}

	/**
	 * @param balanceDue the balanceDue to set
	 */
	public void setBalanceDue(double balanceDue) {
		this.balanceDue = balanceDue;
	}

	/**
	 * @return the attendance
	 */
	public boolean isAttendance() {
		return attendance;
	}

	/**
	 * @param attendance the attendance to set
	 */
	public void setAttendance(boolean attendance) {
		this.attendance = attendance;
	}

}
