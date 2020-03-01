package com.ait.library;

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

@Path("/library")

public class EmployeeController {

	EmployeeDAO employeeDAO = new EmployeeDAO();

	// CRUD -- CREATE operation

	@POST
	@Path("/post")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public EmployeeEntity addEmployee(EmployeeEntity employeeEntity) throws SQLException {
		return employeeDAO.create(employeeEntity);

	}

	// CRUD -- READ LIST operation

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public List<EmployeeEntity> getAllEmployees() throws SQLException {
		System.out.println("getAllEmployees");

		return employeeDAO.findAll();
	}

	// CRUD -- READ FIND operation

	@GET
	@Path("/get/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public EmployeeEntity getEmployeeById(@PathParam("id") int id) throws SQLException {
		System.out.println("findById " + id);
		return employeeDAO.findById(id);
	}

	@GET
	@Path("/search/{query}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<EmployeeEntity> findByMake(@PathParam("query") String query) {
		System.out.println("findByName: " + query);
		return employeeDAO.findByName(query);
	}

	// CRUD -- UPDATE operation

	@PUT
	@Path("/put/{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public EmployeeEntity update(@PathParam("id") Integer id, EmployeeEntity employeeEntity) throws SQLException {
		System.out.println("Updating employee: " + employeeEntity.getLastname() + " and with ID of"
				+ id);
		employeeDAO.updateEmployeeById(employeeEntity, id);
		return employeeEntity;
	}

	// CRUD -- DELETE operation

	@DELETE
	@Path("/delete/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void remove(@PathParam("id") int id) throws SQLException {
		employeeDAO.delete(id);
	}

}
