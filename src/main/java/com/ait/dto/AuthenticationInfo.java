package com.ait.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class AuthenticationInfo {

    private String username;
    private String token;
    private String category;

    public AuthenticationInfo(String username, String token, String category) {
        this.username = username;
        this.token = token;
        this.category = category;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }

	public String getCategory() {
		return category;
	}
}
