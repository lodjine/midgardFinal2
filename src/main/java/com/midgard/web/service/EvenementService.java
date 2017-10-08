package com.midgard.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.EvenementDao;
import com.midgard.web.dao.TacheDao;
import com.midgard.web.model.Evenement;

@RestController
public class EvenementService {
	@Autowired
	EvenementDao evenementDao;

	
	@Autowired
	TacheDao tacheDao;
	@RequestMapping(value = "/evenement", method = RequestMethod.POST)
	public Evenement saveEvent(@RequestBody Evenement evenement) {
		evenementDao.save(evenement);
		return evenement;
	}

	@RequestMapping(value = "/evenement", method = RequestMethod.PUT)
	public Evenement updateEvent(@RequestBody Evenement evenement) {
		evenementDao.save(evenement);
		return evenement;
	}

	@RequestMapping(value = "/evenement", method = RequestMethod.GET)
	public List<Evenement> getEvent() {
		return evenementDao.findAll();
	}

	@RequestMapping(value = "/evenement/{id}", method = RequestMethod.GET)
	public Evenement getEvent(@PathVariable Long id) {
		return evenementDao.findOne(id);
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
		return evenementDao.getEventByProjet( id);
	}

	
	@RequestMapping(value = "/progressionEvent/{id}", method = RequestMethod.GET)
	public void progressionEvent(@PathVariable Long id) {
		
		
		int timout=999999;
		while(timout!=0){
			timout--;
		}
		
		
		List<Evenement> events=evenementDao.findAll();
		
		for(Evenement event:events){
		
		Long progressionTotal=tacheDao.progressionEvent(event.getIdEvenement());
		if(event.getNbTaches()!=null&&progressionTotal!=null){
		
System.out.println("evenement "+event.getIdEvenement()+" progression"+progressionTotal/event.getNbTaches());
		event.setEtatAvancement(progressionTotal/event.getNbTaches());
		
		evenementDao.save(event);
		}
		}
	}
	

}
