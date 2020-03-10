package com.ait.ws;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ait.dao.ClassesDAO;
import com.ait.dto.ClassesDTO;

@Path("classes")
public class ClassesWS {
	ClassesDAO classes = new ClassesDAO();

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<ClassesDTO> findAll() {
		System.out.println("findAll.classes");
		return classes.findAll();
	}
}
