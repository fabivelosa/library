package com.ait.ws;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ait.dao.MembershipDAO;
import com.ait.dto.MembershipDTO; 



@Path("membership")
public class MembershipWS {
	MembershipDAO dao = new MembershipDAO();

	/*
	 * This method return all ACTIVE MEMBERS of the Library.
	 * 
	 */
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<MembershipDTO> findAll() {
		System.out.println("findAll.membership");
		return dao.findAll();
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public MembershipDTO findById(@PathParam("id") String id) {
		/*
		 * This method verify if the customer is a valid member.
		 */
		System.out.println("findById " + id);
		return dao.findById(Integer.parseInt(id));
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public MembershipDTO update(MembershipDTO membership) {
		/*
		 * This method ends a customer membership.
		 */
		System.out.println("inactivating membership ");
		return dao.update(membership);
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public MembershipDTO create(MembershipDTO membership) {

		/*
		 * This method register customer as a member.
		 */
		System.out.println("Creating new membership ");
		return dao.create(membership);
	}
}