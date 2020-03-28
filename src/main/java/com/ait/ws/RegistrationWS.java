package com.ait.ws;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.ait.dao.RegistrationDAO;
import com.ait.dto.RegistrationDTO;

@Path("registration")
public class RegistrationWS {
	RegistrationDAO dao = new RegistrationDAO();

	/*
	 * This method list all registrations
	 */
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<RegistrationDTO> findAll() {
		System.out.println("findAll.registration");
		return dao.findAll();
	}

	@GET
	@Path("/query")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<RegistrationDTO> findByUserIdAndClassId(@QueryParam("user") String userId,
			@QueryParam("class") String classId) {
		System.out.println("findByUserIdAndClassId " + userId + " || " + classId);
		return dao.findByUserIdAndClassId(Integer.parseInt(userId), Integer.parseInt(classId));
	}
	
	/*
	 * This method is for the customer registering to a class.
	 */
	@POST
	@Path("{paymentType}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public RegistrationDTO register(RegistrationDTO registrat, @PathParam("paymentType") String paymentType) {
		System.out.println("Registering customer to a class, paymentType: " + paymentType);
		return dao.create(registrat);
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public RegistrationDTO create(RegistrationDTO registrat) {
		/*
		 * This method register customer to a class.
		 */
		System.out.println("Registering customer to a class ");
		return dao.create(registrat);
	}

	@DELETE
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") int id) {
		/*
		 * This method remove customer from a class.
		 */
		System.out.println("Removing customer from a class ");
		dao.remove(id);
	}

}
