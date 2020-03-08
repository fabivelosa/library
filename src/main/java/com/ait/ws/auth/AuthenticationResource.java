package com.ait.ws.auth;

import com.ait.controller.auth.Secured;
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
		String category = authenticationDao.authenticate(credentials.getUsername(), credentials.getPassword());

		if (category != null) {
			AuthenticationInfo authenticationInfo = TokensController.issueNewToken(credentials.getUsername(), category);
			return Response.ok(authenticationInfo).build();
		} else {
			return Response.status(Response.Status.FORBIDDEN).build();
		}
    }

    @Secured
    @GET
    @Path("/logout/{token}")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response logout(@PathParam("token") String token) {
        TokensController.revokeToken(token);
        return Response.ok(token).build();
    }
}
