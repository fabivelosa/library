package com.ait.ws;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ait.dao.MembershipDAO;
import com.ait.dto.MembershipDTO;

@Path("membership")
public class MembershipWS {
	MembershipDAO membership = new MembershipDAO();

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<MembershipDTO> findAll() {
		System.out.println("findAll.membership");
		return membership.findAll();
	}
}