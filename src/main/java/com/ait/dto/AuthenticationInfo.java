package com.ait.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class AuthenticationInfo {

	private int userId;
    private String username;
    private String token;
    private String category;

    public AuthenticationInfo(int userId, String username, String category) {
    	this.userId = userId;
        this.username = username;
        this.category = category;
    }

    public int getUserId() {
		return userId;
	}

	public String getUsername() {
        return username;
    }

	public void setToken(String token) {
		this.token = token;
	}

	public String getToken() {
        return token;
    }

	public String getCategory() {
		return category;
	}
}
