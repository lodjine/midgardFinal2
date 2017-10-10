package com.midgard.web.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name="ticket_destinataire")
public class TicketDestinataire {

	@EmbeddedId
	private IdTicketDestinataire id;
	
	@ManyToOne
	@JoinColumn(name="ticket_iddb_ticket",insertable=false,updatable=false)
	private Ticket ticket;
	@ManyToOne
	@JoinColumn(name="destinataire_user_id",insertable=false,updatable=false)
	private User destinataire;
	
	

	public IdTicketDestinataire getId() {
		return id;
	}

	public void setId(IdTicketDestinataire id) {
		this.id = id;
	}

	public Ticket getTicket() {
		return ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

	public User getDestinataire() {
		return destinataire;
	}

	public void setDestinataire(User destinataire) {
		this.destinataire = destinataire;
	}

	 
	
}
