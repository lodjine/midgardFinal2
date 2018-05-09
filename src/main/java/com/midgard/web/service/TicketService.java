package com.midgard.web.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.HistoriqueDao;
import com.midgard.web.dao.ProjetDao;
import com.midgard.web.dao.TicketDao;
import com.midgard.web.dao.TicketDestinataireDao;
import com.midgard.web.model.Evenement;
import com.midgard.web.model.HistoriqueETT;
import com.midgard.web.model.Ticket;
@RestController
public class TicketService {
	@Autowired
	private TicketDao ticketDao;
	@Autowired
	private TicketDestinataireDao  ticketDestinataireDao;
	@Autowired
	private ProjetDao projetDao;
	
	@Autowired
	private HistoriqueDao histDao;

	@RequestMapping(value = "/ticket", method = RequestMethod.POST)
	public Ticket saveTicket(@RequestBody Ticket ticket) {
		if(!ticket.getProjet().equals(null)&&!ticket.getProjet().getIdProjet().equals(null)) {
			ticket.setProjet(projetDao.getProjetByIdFunct(ticket.getProjet().getIdProjet()).get(0));
		}
		
		ticketDao.save(ticket);

		return ticket;
	}
	@RequestMapping(value = "/ticketHisto/{id}", method = RequestMethod.GET)
	public Ticket saveHisto(@PathVariable Long id) {
		Ticket ticket=ticketDao.findOne(id);
		if(!ticket.getTypeTicket().equals("Projet"))
		histDao.save(createHistorique(ticket));

		return ticket;
	}
	@RequestMapping(value = "/ticket", method = RequestMethod.PUT)
	public Ticket updateTicket(@RequestBody Ticket ticket) {
		ticketDao.save(ticket);
		return ticket;
	}

	@RequestMapping(value = "/ticket", method = RequestMethod.GET)
	public List<Ticket> getTickets() {
		return ticketDao.findAll();
	}

	@RequestMapping(value = "/ticket/{id}", method = RequestMethod.GET)
	public Ticket getTicket(@PathVariable Long id) {
		return ticketDao.findOne(id);
	}

	@RequestMapping(value = "/ticket/{id}", method = RequestMethod.DELETE)
	public void deleteTicket(@PathVariable Long id) {
		ticketDao.delete(id);
	}
	
	@RequestMapping(value = "/deleteTacheDestByTicketId/{id}", method = RequestMethod.GET)
	public long deleteTacheDestByTicketId(@PathVariable Long id) {
		ticketDestinataireDao.deleteTacheDestByTicketId(id);
		
		return 1L;
	}
	
	public HistoriqueETT createHistorique(Ticket ticket) {
		 Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	      String name = auth.getName();
		return new HistoriqueETT(ticket.getIdTicket(), ticket.getClass().getSimpleName(), ticket.getStatut().getStatut(), new Date(), ticket.getCommentaire(),name);
	}
}
