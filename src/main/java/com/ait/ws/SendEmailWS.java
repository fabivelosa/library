package com.ait.ws;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import com.ait.dto.EmailContentDTO;

@Path("/sendEmail")
public class SendEmailWS {

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void sendEmail(EmailContentDTO emailContent) {
		System.out.println("Sending an email: " + emailContent);

		Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", "465");
		prop.put("mail.smtp.ssl.enable", "true");
		prop.put("mail.smtp.auth", "true");

		Session session = Session.getInstance(prop, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("testinglibraryaddress@gmail.com", "library2020@");
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("testinglibraryaddress@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("testinglibraryaddress@gmail.com"));
			message.setSubject("New message from " + emailContent.getName());
			message.setText("Customer email: " + emailContent.getEmailAddress() + "\n\nCustomer name: "
					+ emailContent.getName() + "\n\nMessage: " + emailContent.getMessage());

			Transport.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
}
