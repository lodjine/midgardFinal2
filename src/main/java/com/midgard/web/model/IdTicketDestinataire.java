package com.midgard.web.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;

@Embeddable
public class IdTicketDestinataire implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7172634395400458206L;


	private Long ticket_iddb_ticket;
	

	private Long destinataire_user_id;


	public Long getTicket_iddb_ticket() {
		return ticket_iddb_ticket;
	}


	public void setTicket_iddb_ticket(Long ticket_iddb_ticket) {
		this.ticket_iddb_ticket = ticket_iddb_ticket;
	}


	public Long getDestinataire_user_id() {
		return destinataire_user_id;
	}


	public void setDestinataire_user_id(Long destinataire_user_id) {
		this.destinataire_user_id = destinataire_user_id;
	}


	


	
	
	
	
	
}
