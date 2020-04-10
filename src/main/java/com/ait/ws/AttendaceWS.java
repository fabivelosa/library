package com.ait.ws;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ait.dao.AttendanceDAO;
import com.ait.dto.ClassesDTO;

	@Path("attendance")
	public class AttendaceWS {
		AttendanceDAO dao = new AttendanceDAO();

		@GET
		@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
		public List<ClassesDTO> findAll() {
			System.out.println("findAttendancebyClass");
			return dao.findAttendancebyClass();
		}
		
}