package library;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ait.dao.RegistrationDAO;
import com.ait.dto.RegistrationDTO;
import com.ait.rsc.DataBaseConnection;

class RegistrationTest {

	public RegistrationDTO registration;
	public RegistrationDAO dao;
	List<RegistrationDTO> list = new ArrayList<RegistrationDTO>();
	public DataBaseConnection con;
	Connection c = null;
	int toBeRemoved = 0;

	@BeforeEach
	public void init() throws ClassNotFoundException, SQLException {
		c = DataBaseConnection.getConnection();
		dao = new RegistrationDAO();
	}

	/**
	 * @throws java.lang.Exception
	 */
	@AfterEach
	public void tearDown() throws Exception {
		c.close();
	}

	@Test
	void testCreateandRemove() {
		Date today = new Date();

		registration = new RegistrationDTO();
		registration.setClassId(1);
		registration.setMemberId(1);
		registration.setFeeDue(40);
		registration.setAttendance(true);
		registration.setRegDate(today);
		registration = dao.create(registration);
		toBeRemoved = registration.getRegistrationId();

		boolean remove = dao.remove(toBeRemoved);
		assertTrue(remove);
	}

	@Test
	void testFindAll() {
		list = dao.findAll();
		assertFalse(list.isEmpty());
	}

	@Test
	void testFindByRegionAndCategory() {
		list = dao.findByUserIdAndClassId(1, 1);
		assertFalse(list.isEmpty());
	}

	@Test
	void testFindByRegionAndCategoryNotFound() {
		list = dao.findByUserIdAndClassId(0, 0);
		assertTrue(list.isEmpty());
	}

}
