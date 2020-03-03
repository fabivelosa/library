package com.ait.ws;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ait.dao.RegistrationDAO;
import com.ait.dto.RegistrationDTO;

@Path("registration")
public class RegistrationWS {
	RegistrationDAO registration = new RegistrationDAO();

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<RegistrationDTO> findAll() {
		System.out.println("findAll.registration"); 
		return registration.findAll();
	}
}
