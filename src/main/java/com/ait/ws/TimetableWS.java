package com.ait.ws;

import java.util.Map;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.ait.dao.TimetableDao;

@Path("/timetable")
public class TimetableWS {
	
	TimetableDao dao = new TimetableDao();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Map<String, String[]> findAll() {
		System.out.println("findAll.timetable");
		return dao.findAll();
	}
}
