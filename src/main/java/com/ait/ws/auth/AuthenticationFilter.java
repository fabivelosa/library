package com.ait.ws.auth;

import com.ait.controller.auth.Secured;
import com.ait.controller.auth.TokensController;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

@Secured
@Provider
public class AuthenticationFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String authenticationToken = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        if (authenticationToken == null || !TokensController.validateToken(authenticationToken)) {
			requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }
}
