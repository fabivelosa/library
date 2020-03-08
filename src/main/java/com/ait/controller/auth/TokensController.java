package com.ait.controller.auth;

import com.ait.dto.AuthenticationInfo;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class TokensController {

    private static final Map<String, AuthenticationInfo> TOKEN_HOLDER = new ConcurrentHashMap<>();

    public static AuthenticationInfo issueNewToken(String username, String category) {
        String token = UUID.randomUUID().toString();
		AuthenticationInfo auth = new AuthenticationInfo(username, token, category);
        TOKEN_HOLDER.put(token, auth);
        return auth;
    }

    public static boolean validateToken(String token) {
        AuthenticationInfo authenticationInfo = TOKEN_HOLDER.get(token);
        if (authenticationInfo != null) {
            return true;
        } else {
			return false;
		}
    }

    public static void revokeToken(String token) {
        TOKEN_HOLDER.remove(token);
    }
}
