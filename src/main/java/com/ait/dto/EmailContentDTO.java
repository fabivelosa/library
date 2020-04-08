package com.ait.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class EmailContentDTO {
	
	private String emailAddress;
	private String name;
	private String message;
	
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "EmailContentDTO [emailAddress=" + emailAddress + ", name=" + name + ", message=" + message + "]";
	}
}
