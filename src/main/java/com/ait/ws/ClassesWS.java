package com.ait.ws;

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

import com.ait.dao.ClassesDAO;
import com.ait.dto.ClassesDTO;



@Path("/classes")
public class ClassesWS {
	ClassesDAO dao = new ClassesDAO();

	/*
	 * READ all classes
	 */
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<ClassesDTO> findAll() {
		System.out.println("findAll.classes");
		return dao.findAll();
	}
	
	@GET
	@Path("{userId}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<ClassesDTO> findAllByRegisterStatus(@PathParam("userId") int userId) {
		System.out.println("findAllByRegisterStatus.classes: " + userId);
		return dao.findAllByRegisterStatus(userId);
	}
	
	/*
	 * CREATE a class
	 */
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public ClassesDTO create(ClassesDTO classes) {
		System.out.println("Creating a class: ");
		return dao.create(classes);
	}
	
	/*
	 * UPDATE a class
	 */
	
	@PUT @Path ("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public ClassesDTO update(ClassesDTO classes) {
		System.out.println("Updating class: "+ classes.getClass_title());
		dao.update(classes);
		return classes;
	}
	
	/*
	 * DELETE a class 
	 */
	
	@DELETE @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") int id) {
		dao.remove(id);
	}
}