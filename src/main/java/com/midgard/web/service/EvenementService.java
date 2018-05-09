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

import com.midgard.web.dao.EvenementDao;
import com.midgard.web.dao.HistoriqueDao;
import com.midgard.web.dao.TacheDao;
import com.midgard.web.model.Evenement;
import com.midgard.web.model.HistoriqueETT;

@RestController
public class EvenementService {
	@Autowired
	EvenementDao evenementDao;

	@Autowired
	private HistoriqueDao histoDao;
	@Autowired
	TacheDao tacheDao;

	@RequestMapping(value = "/evenement", method = RequestMethod.POST)
	public Evenement saveEvent(@RequestBody Evenement evenement) {

		evenementDao.save(evenement);
		return evenement;
	}

	@RequestMapping(value = "/evenementHisto/{id}", method = RequestMethod.GET)
	public Evenement saveHisto(@PathVariable Long id) {
		Evenement evenement=evenementDao.findOne(id);
		
		histoDao.save(createHistorique(evenement));
		return evenement;
	}

	@RequestMapping(value = "/evenement", method = RequestMethod.PUT)
	public Evenement updateEvent(@RequestBody Evenement evenement) {
		evenementDao.save(evenement);
		return evenement;
	}

	@RequestMapping(value = "/evenement", method = RequestMethod.GET)
	public List<Evenement> getEvent() {
		List<Long> idProjetNonTraite = evenementDao.getListTacheProjetNonTraiter("Non traité");
		List<Evenement> evenemetents = evenementDao.findAll();
		evenemetents.stream().filter(ev -> idProjetNonTraite.contains(ev.getIdEvenement()))
				.forEach(ev -> ev.setTicketNonTraite(true));
		evenemetents.stream().filter(ev -> !idProjetNonTraite.contains(ev.getIdEvenement()))
				.forEach(ev -> ev.setTicketNonTraite(false));
		return evenemetents;
	}

	@RequestMapping(value = "/evenement/{id}", method = RequestMethod.GET)
	public Evenement getEvent(@PathVariable Long id) {
		Evenement event = evenementDao.findOne(id);
		List<HistoriqueETT> historiques = histoDao.getByElementId(event.getIdEvent());
		event.setHistorique(historiques);
		return event;
	}

	@RequestMapping(value = "/evenement/{id}", method = RequestMethod.DELETE)
	public void deleteEvents(@PathVariable Long id) {
		evenementDao.delete(id);
	}

	@RequestMapping(value = "/getHeurTech/{id}", method = RequestMethod.GET)
	public Long getHeurTech(@PathVariable Long id) {
		return evenementDao.getheurTech(id);
	}

	@RequestMapping(value = "/getHeurIng/{id}", method = RequestMethod.GET)
	public Long getHeurIng(@PathVariable Long id) {
		return evenementDao.getheurIng(id);
	}

	@RequestMapping(value = "/getHeurTechCumul/{id}", method = RequestMethod.GET)
	public Long getHeurTechCumul(@PathVariable Long id) {
		return evenementDao.getheurTechCumul(id);
	}

	@RequestMapping(value = "/getHeurIngCumul/{id}", method = RequestMethod.GET)
	public Long getHeurIngCumul(@PathVariable Long id) {
		return evenementDao.getheurIngCumul(id);
	}

	@RequestMapping(value = "/getEventByProjet/{id}", method = RequestMethod.GET)
	public List<Evenement> getEventB(@PathVariable Long id) {
		List<Evenement> events = evenementDao.getEventByProjet(id);
		return events;
	}

	@RequestMapping(value = "/progressionEvent/{id}", method = RequestMethod.GET)
	public void progressionEvent(@PathVariable Long id) {

		int timout = 999999;
		while (timout != 0) {
			timout--;
		}

		List<Evenement> events = evenementDao.findAll();

		for (Evenement event : events) {

			Long progressionTotal = tacheDao.progressionEvent(event.getIdEvenement());
			if (event.getNbTaches() != null && progressionTotal != null) {

				System.out.println("evenement " + event.getIdEvenement() + " progression"
						+ progressionTotal / event.getNbTaches());
				event.setEtatAvancement(progressionTotal / event.getNbTaches());

				evenementDao.save(event);
			}
		}
	}

	public HistoriqueETT createHistorique(Evenement event) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		return new HistoriqueETT(event.getIdEvent(), event.getClass().getSimpleName(), event.getStatut().getStatut(),
				new Date(), event.getCommentaire(), name);
	}
}
