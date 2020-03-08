package com.ait.library.member;

import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/library/member")

public class MemberController {

	MemberDAO memberDAO = new MemberDAO();

	// CRUD -- CREATE operation

	@POST
	@Path("/post")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public MemberEntity addMember(MemberEntity memberEntity) throws SQLException {
		return memberDAO.create(memberEntity);

	}

	// CRUD -- READ LIST operation

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public List<MemberEntity> getAllMembers() throws SQLException {
		System.out.println("getAllEmployees");

		return memberDAO.findAll();
	}

	// CRUD -- READ FIND operation

	@GET
	@Path("/get/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public MemberEntity getMemberById(@PathParam("id") int id) throws SQLException {
		System.out.println("findById " + id);
		return memberDAO.findById(id);
	}

	@GET
	@Path("/search/{query}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<MemberEntity> findByMake(@PathParam("query") String query) {
		System.out.println("findByName: " + query);
		return memberDAO.findByName(query);
	}

	// CRUD -- UPDATE operation

	@PUT
	@Path("/put/{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public MemberEntity update(@PathParam("id") Integer id, MemberEntity memberEntity) throws SQLException {
		System.out.println("Updating member: " + memberEntity.getLastname() + " and with ID of"
				+ id);
		memberDAO.updateMemberById(memberEntity, id);
		return memberEntity;
	}

	// CRUD -- DELETE operation

	@DELETE
	@Path("/delete/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void remove(@PathParam("id") int id) throws SQLException {
		memberDAO.delete(id);
	}

}
