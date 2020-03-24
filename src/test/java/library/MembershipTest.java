package library;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ait.dao.MembershipDAO;
import com.ait.dto.MembershipDTO;
import com.ait.rsc.DataBaseConnection;

class MembershipTest {

	public MembershipDTO membership;
	public MembershipDAO dao;
	List<MembershipDTO> list = new ArrayList<MembershipDTO>();
	public DataBaseConnection con;
	Connection c = null;
	int toBeUpdated = 0;

	@BeforeEach
	public void init() throws ClassNotFoundException, SQLException {
		c = DataBaseConnection.getConnection();
		dao = new MembershipDAO();
	}

	/**
	 * @throws java.lang.Exception
	 */
	@AfterEach
	public void tearDown() throws Exception {
		c.close();
	}

	@Test
	void testCreate() {
		Calendar cal = Calendar.getInstance();
		Date today = cal.getTime();
		cal.add(Calendar.YEAR, 1);
		Date nextYear = cal.getTime();

		membership = new MembershipDTO();
		membership.setUserId(3);
		membership.setStartDate(today);
		membership.setEndDate(nextYear);
		membership = dao.create(membership);

	}

	@Test
	void testUpdate() {
		Date today = new Date();
		membership = new MembershipDTO();
		membership.setUserId(3);
		membership.setEndDate(today);
		membership = dao.update(membership);
		assertEquals(today, membership.getEndDate());
	}

	@Test
	void testFindAll() {
		list = dao.findAll();
		assertFalse(list.isEmpty());
	}

	@Test
	void testFindbyId() {
		membership = dao.findById(1);
		assertEquals(1, membership.getUserId());
	}

	@Test
	public void testFindByIdNotFound() {
		assertEquals(null, dao.findById(0));
	}

}
