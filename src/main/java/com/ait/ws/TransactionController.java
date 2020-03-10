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

import com.ait.dao.TransactionDAO;
import com.ait.dto.TransactionEntity;

@Path("/library/transaction")

public class TransactionController {

	TransactionDAO TransactionDAO = new TransactionDAO();

	// CRUD -- CREATE operation

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public TransactionEntity addTransaction(TransactionEntity TransactionEntity) throws SQLException {
		return TransactionDAO.create(TransactionEntity);

	}

	// CRUD -- READ LIST operation

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public List<TransactionEntity> getAllTransactions() throws SQLException {
		System.out.println("getAllTransactions");

		return TransactionDAO.findAll();
	}

	// CRUD -- READ FIND operation

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public TransactionEntity getTransactionById(@PathParam("id") int id) throws SQLException {
		System.out.println("findById " + id);
		return TransactionDAO.findById(id);
	}

	@GET
	@Path("/search/{query}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<TransactionEntity> findByMake(@PathParam("query") String query) {
		System.out.println("findByName: " + query);
		return TransactionDAO.findByName(query);
	}

	// CRUD -- UPDATE operation

	@PUT
	@Path("/{id}")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public TransactionEntity update(@PathParam("id") Integer id, TransactionEntity TransactionEntity)
			throws SQLException {
		System.out.println("Updating Transaction: " + TransactionEntity.getName() + " and with ID of" + id);
		TransactionDAO.updateTransactionById(TransactionEntity, id);
		return TransactionEntity;
	}

	// CRUD -- DELETE operation

	@DELETE
	@Path("/{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public void remove(@PathParam("id") int id) throws SQLException {
		TransactionDAO.delete(id);
	}

}
