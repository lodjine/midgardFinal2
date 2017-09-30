package com.midgard.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.midgard.web.dao.TacheDao;
import com.midgard.web.model.Tache;

@RestController
public class TacheService {

	@Autowired
	private TacheDao tacheDao;

	@RequestMapping(value = "/tache", method = RequestMethod.POST)
	public Tache saveTache(@RequestBody Tache tache) {
		tacheDao.save(tache);
		return tache;
	}

	@RequestMapping(value = "/tache", method = RequestMethod.PUT)
	public Tache updateTache(@RequestBody Tache tache) {
		tacheDao.save(tache);
		return tache;
	}

	@RequestMapping(value = "/tache", method = RequestMethod.GET)
	public List<Tache> getTaches() {
		return tacheDao.findAll();
	}

	@RequestMapping(value = "/tache/{id}", method = RequestMethod.GET)
	public Tache getTache(@PathVariable Long id) {
		return tacheDao.findOne(id);
	}

	@RequestMapping(value = "/tache/{id}", method = RequestMethod.DELETE)
	public void deleteTache(@PathVariable Long id) {
		tacheDao.delete(id);
	}

	@RequestMapping(value = "/tachesByEvent/{id}", method = RequestMethod.GET)
	public List<Tache> getTachesByEvent(@PathVariable Long id) {
		return tacheDao.getTacheByEvent(id);
	}

}