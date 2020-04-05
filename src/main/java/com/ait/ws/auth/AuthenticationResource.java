package com.ait.ws.auth;

import com.ait.controller.auth.TokensController;
import com.ait.dao.AuthenticationDao;
import com.ait.dto.AuthenticationInfo;
import com.ait.dto.Credentials;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public class AuthenticationResource {

    private final AuthenticationDao authenticationDao = new AuthenticationDao();

    @POST
    @Path("/login")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response authenticateUser(Credentials credentials) {
        System.out.println("/login invoked, " + credentials.getUsername());
        AuthenticationInfo authenticationInfo = authenticationDao.authenticate(credentials.getUsername(), credentials.getPassword());

		if (authenticationInfo != null) {
			authenticationInfo = TokensController.issueNewToken(authenticationInfo);
			return Response.ok(authenticationInfo).build();
		} else {
			return Response.status(Response.Status.FORBIDDEN).build();
		}
    }

    @GET
    @Path("/logout/{token}")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response logout(@PathParam("token") String token) {
        TokensController.revokeToken(token);
        return Response.ok().build();
    }
}
