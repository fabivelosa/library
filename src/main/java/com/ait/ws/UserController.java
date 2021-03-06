package com.ait.ws;

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

import com.ait.dao.AuthenticationDao;
import com.ait.dao.UserDAO;
import com.ait.dto.UserEntity;

@Path("/user")

public class UserController {

	UserDAO userDAO = new UserDAO();
	AuthenticationDao authenticationDao = new AuthenticationDao();

	// CRUD -- CREATE operation

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public UserEntity addUser(UserEntity userEntity) throws SQLException {
		UserEntity user = userDAO.create(userEntity);
		authenticationDao.create(user.getUserId(), user.getUsername(), user.getPassword()); 
		return user;

	}

	// CRUD -- READ LIST operation

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public List<UserEntity> getAllUsers() throws SQLException {
		System.out.println("getAllUsers");

		return userDAO.findAll();
	}

	// CRUD -- READ FIND operation

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public UserEntity getUserById(@PathParam("id") int id) throws SQLException {
		System.out.println("findById " + id);
		return userDAO.findById(id);
	}

	@GET
	@Path("/search/{query}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<UserEntity> findByMake(@PathParam("query") String query) {
		System.out.println("findByName: " + query);
		return userDAO.findByName(query);
	}

	// CRUD -- UPDATE operation

	@PUT
	@Path("/{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public UserEntity update(@PathParam("id") Integer id, UserEntity userEntity) throws SQLException {
		System.out.println("Updating user: " + userEntity.getLastname() + " and with ID of"
				+ id);
		userDAO.updateUserById(userEntity, id);
		return userEntity;
	}
	
	// CRUD -- UPDATE Customer Balance operation

		@PUT
		@Path("/balance/{id}/{balance}")
		@Consumes({ MediaType.APPLICATION_JSON })
		@Produces({ MediaType.APPLICATION_JSON })

		
		public void updateBalance(@PathParam("id") Integer id, @PathParam("balance") Float balance) throws SQLException {
			System.out.println("Updating user:  and with ID of"
					+ id + "Update account balance of "+ balance);
			userDAO.updateUserBalanceById(id, balance);
			
		}
	

	// CRUD -- DELETE operation

	@DELETE
	@Path("/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void remove(@PathParam("id") int id) throws SQLException {
		userDAO.delete(id);
	}

}
