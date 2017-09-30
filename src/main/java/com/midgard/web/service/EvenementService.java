package com.midgard.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.EvenementDao;
import com.midgard.web.model.Evenement;

@RestController
public class EvenementService {
	@Autowired
	EvenementDao evenementDao;

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

}
